// @vitest-environment jsdom
import { LOCAL_STORAGE, QueryClientProvider, useAdminShowList } from '@boolti/api';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { transferableAbortController } from 'node:util';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import AuthErrorBoundary from './AuthErrorBoundary';

vi.mock('@boolti/api/src/constants', async (original) => ({
  ...(await original<object>()),
  API_URL: 'https://api.test',
  IS_SUPER_ADMIN: true,
}));

const server = setupServer();
const showsUrl = 'https://api.test/sa-api/v1/shows';
const refreshUrl = 'https://api.test/sa-api/papi/v1/login/refresh';

const Shows = () => {
  const { data, isLoading } = useAdminShowList(0);
  return <div>{isLoading ? '공연 로딩 중' : data?.content.map((show) => show.showName)}</div>;
};

const renderShows = () =>
  render(
    <QueryClientProvider>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/login" element={<div>로그인 페이지</div>} />
          <Route
            path="/"
            element={
              <AuthErrorBoundary>
                <Shows />
              </AuthErrorBoundary>
            }
          />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );

describe('super-admin authentication error recovery', () => {
  beforeEach(() => {
    localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, 'expired-test-access');
    localStorage.setItem(LOCAL_STORAGE.REFRESH_TOKEN, 'test-refresh');
    // jsdom's AbortSignal is incompatible with Node's native Request used by ky.
    vi.stubGlobal(
      'AbortController',
      class {
        constructor() {
          return transferableAbortController();
        }
      },
    );
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    // Bound the original render/setState loop so a regression fails instead of hanging.
    const setState = React.Component.prototype.setState;
    let updates = 0;
    vi.spyOn(React.Component.prototype, 'setState').mockImplementation(function (
      this: React.Component,
      ...args
    ) {
      if (++updates > 30) throw new Error('Error boundary update loop');
      return setState.apply(this, args);
    });
    server.listen({ onUnhandledRequest: 'error' });
  });

  afterEach(() => {
    cleanup();
    server.close();
    server.resetHandlers();
    localStorage.clear();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('clears rejected credentials and redirects to login', async () => {
    server.use(
      http.get(showsUrl, () => new HttpResponse(null, { status: 401 })),
      http.post(refreshUrl, () => new HttpResponse(null, { status: 400 })),
    );
    renderShows();

    expect(await screen.findByText('로그인 페이지')).toBeTruthy();
    expect(localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)).toBeNull();
    expect(localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN)).toBeNull();
  });

  it('preserves credentials after a refresh network failure and retries successfully', async () => {
    server.use(
      http.get(showsUrl, () => new HttpResponse(null, { status: 401 })),
      http.post(refreshUrl, () => HttpResponse.error()),
    );
    renderShows();

    expect(await screen.findByText('정보를 불러오지 못했어요')).toBeTruthy();
    expect(screen.queryByText('로그인 페이지')).toBeNull();
    expect(localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)).toBe('expired-test-access');
    expect(localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN)).toBe('test-refresh');

    server.use(
      http.get(showsUrl, ({ request }) =>
        request.headers.get('Authorization') === 'Bearer renewed-test-access'
          ? HttpResponse.json({ content: [{ id: 1, showName: '복구된 공연' }], totalElements: 1 })
          : new HttpResponse(null, { status: 401 }),
      ),
      http.post(refreshUrl, () =>
        HttpResponse.json({
          accessToken: 'renewed-test-access',
          refreshToken: 'renewed-test-refresh',
        }),
      ),
    );
    fireEvent.click(screen.getByRole('button', { name: '다시 시도' }));

    expect(await screen.findByText('복구된 공연')).toBeTruthy();
    expect(screen.queryByText('정보를 불러오지 못했어요')).toBeNull();
    expect(localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)).toBe('renewed-test-access');
    expect(localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN)).toBe('renewed-test-refresh');
  });

  it('allows logging in again after a network failure', async () => {
    server.use(http.get(showsUrl, () => HttpResponse.error()));
    renderShows();

    fireEvent.click(await screen.findByRole('button', { name: '다시 로그인' }));

    expect(await screen.findByText('로그인 페이지')).toBeTruthy();
    expect(localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)).toBeNull();
    expect(localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN)).toBeNull();
  });

  it('shows a stable error screen when the server keeps failing after retry', async () => {
    server.use(http.get(showsUrl, () => new HttpResponse(null, { status: 500 })));
    renderShows();

    fireEvent.click(await screen.findByRole('button', { name: '다시 시도' }));

    expect(await screen.findByText('정보를 불러오지 못했어요')).toBeTruthy();
    expect(localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN)).toBe('test-refresh');
  });
});
