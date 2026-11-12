// @vitest-environment jsdom
import { LOCAL_STORAGE, QueryClientProvider } from '@boolti/api';
import { ThemeProvider } from '@emotion/react';
import palette from '@boolti/ui/src/systems/palette';
import typo from '@boolti/ui/src/systems/typo';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { App } from 'antd';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { transferableAbortController } from 'node:util';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import PasswordChangeGate from '~/components/PasswordChangeGate';
import { PATH } from '~/constants/routes';
import OperatorConfirmModal from '~/pages/AdminUserPage/OperatorConfirmModal';
import PasswordChangePage from '~/pages/PasswordChangePage';
import { getNewPasswordError, getUtf8ByteLength } from '~/utils/password';

vi.mock('@boolti/api/src/constants', async (original) => ({
  ...(await original<object>()),
  API_URL: 'https://api.test',
  IS_SUPER_ADMIN: true,
}));

const server = setupServer();
const API = 'https://api.test/sa-api/v1/super-admin-users';

const me = (overrides: Partial<Record<string, unknown>> = {}) => ({
  id: 1,
  identity: 'ramji',
  canManageAccounts: true,
  passwordChangeRequired: false,
  ...overrides,
});

const Providers = ({ children, initialPath }: React.PropsWithChildren<{ initialPath: string }>) => (
  <QueryClientProvider>
    <ThemeProvider theme={{ palette, typo } as never}>
      <App>
        <MemoryRouter initialEntries={[initialPath]}>{children}</MemoryRouter>
      </App>
    </ThemeProvider>
  </QueryClientProvider>
);

const renderGate = (initialPath = PATH.ADMIN_USERS) =>
  render(
    <Providers initialPath={initialPath}>
      <Routes>
        <Route
          path="*"
          element={
            <PasswordChangeGate>
              <Routes>
                <Route path={PATH.ADMIN_USERS} element={<div>계정 목록 화면</div>} />
                <Route path={PATH.PASSWORD_CHANGE} element={<div>비밀번호 변경 화면</div>} />
              </Routes>
            </PasswordChangeGate>
          }
        />
      </Routes>
    </Providers>,
  );

beforeEach(() => {
  localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, 'test-access');
  localStorage.setItem(LOCAL_STORAGE.REFRESH_TOKEN, 'test-refresh');
  // jsdom의 AbortSignal은 ky가 쓰는 Node Request와 맞지 않는다.
  vi.stubGlobal(
    'AbortController',
    class {
      constructor() {
        return transferableAbortController();
      }
    },
  );
  // antd가 반응형 처리를 위해 matchMedia를 부른다.
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }));
  vi.spyOn(console, 'error').mockImplementation(() => {});
  vi.spyOn(console, 'warn').mockImplementation(() => {});
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

describe('비밀번호 변경 필수 가드', () => {
  it('임시 비밀번호로 로그인한 계정은 비밀번호 변경 화면으로 보낸다', async () => {
    server.use(http.get(`${API}/me`, () => HttpResponse.json(me({ passwordChangeRequired: true }))));
    renderGate();
    expect(await screen.findByText('비밀번호 변경 화면')).toBeTruthy();
    expect(screen.queryByText('계정 목록 화면')).toBeNull();
  });

  it('변경이 필요 없으면 원래 화면을 보여 준다', async () => {
    server.use(http.get(`${API}/me`, () => HttpResponse.json(me())));
    renderGate();
    expect(await screen.findByText('계정 목록 화면')).toBeTruthy();
  });

  it('본인 정보 조회가 실패해도 화면을 막지 않는다', async () => {
    server.use(http.get(`${API}/me`, () => new HttpResponse(null, { status: 500 })));
    renderGate();
    expect(await screen.findByText('계정 목록 화면')).toBeTruthy();
  });
});

describe('다른 계정 관리 모달', () => {
  const target = {
    user: { id: 2, identity: 'old-member', active: true, createdAt: '2026-01-01T00:00:00Z' },
  };

  it.each([
    ['deactivate', '비활성화'],
    ['password-reset', '초기화'],
    ['activate', '재활성화'],
  ] as const)('%s: 내 비밀번호를 담아 해당 계정 API를 부른다', async (action, okText) => {
    let received: { url: string; body: unknown } | null = null;
    server.use(
      http.post(`${API}/2/${action}`, async ({ request }) => {
        received = { url: request.url, body: await request.json() };
        return new HttpResponse(null, { status: 200 });
      }),
      http.get(API, () => HttpResponse.json([])),
    );
    const onClose = vi.fn();
    render(
      <Providers initialPath="/">
        <OperatorConfirmModal target={{ ...target, action }} onClose={onClose} />
      </Providers>,
    );

    fireEvent.change(screen.getByLabelText('내 비밀번호'), { target: { value: 'my-password' } });
    fireEvent.click(screen.getByRole('button', { name: okText }));

    await waitFor(() => expect(onClose).toHaveBeenCalled());
    expect(received).toEqual({
      url: `${API}/2/${action}`,
      body: { requesterCurrentPassword: 'my-password' },
    });
  });

  it('서버가 거절하면 모달을 닫지 않고 서버 메시지를 보여 준다', async () => {
    server.use(
      http.post(`${API}/2/deactivate`, () =>
        HttpResponse.json({ type: 'INVALID_PASSWORD', detail: '비밀번호가 일치하지 않습니다.' }, { status: 400 }),
      ),
    );
    const onClose = vi.fn();
    render(
      <Providers initialPath="/">
        <OperatorConfirmModal target={{ ...target, action: 'deactivate' }} onClose={onClose} />
      </Providers>,
    );

    fireEvent.change(screen.getByLabelText('내 비밀번호'), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: '비활성화' }));

    expect(await screen.findByText('비밀번호가 일치하지 않습니다.')).toBeTruthy();
    expect(onClose).not.toHaveBeenCalled();
  });
});

describe('본인 비밀번호 변경', () => {
  const renderPage = () =>
    render(
      <Providers initialPath={PATH.PASSWORD_CHANGE}>
        <Routes>
          <Route path={PATH.PASSWORD_CHANGE} element={<PasswordChangePage />} />
          <Route path={PATH.LOGIN} element={<div>로그인 화면</div>} />
        </Routes>
      </Providers>,
    );

  it('바꾸면 토큰을 지우고 로그인 화면으로 보낸다', async () => {
    let body: unknown = null;
    server.use(
      http.get(`${API}/me`, () => HttpResponse.json(me({ passwordChangeRequired: true }))),
      http.put(`${API}/me/password`, async ({ request }) => {
        body = await request.json();
        return new HttpResponse(null, { status: 200 });
      }),
    );
    renderPage();

    expect(await screen.findByText('임시 비밀번호로 로그인했어요')).toBeTruthy();
    fireEvent.change(screen.getByLabelText('임시 비밀번호'), { target: { value: 'temp-pass' } });
    fireEvent.change(screen.getByLabelText('새 비밀번호'), { target: { value: 'NewPass1!' } });
    fireEvent.change(screen.getByLabelText('새 비밀번호 확인'), { target: { value: 'NewPass1!' } });
    fireEvent.click(screen.getByRole('button', { name: '변경하기' }));

    expect(await screen.findByText('로그인 화면')).toBeTruthy();
    expect(body).toEqual({ currentPassword: 'temp-pass', newPassword: 'NewPass1!' });
    expect(localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)).toBeNull();
    expect(localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN)).toBeNull();
  });

  it('확인 값이 다르면 요청하지 않는다', async () => {
    const put = vi.fn(() => new HttpResponse(null, { status: 200 }));
    server.use(
      http.get(`${API}/me`, () => HttpResponse.json(me())),
      http.put(`${API}/me/password`, put),
    );
    renderPage();

    fireEvent.change(await screen.findByLabelText('현재 비밀번호'), { target: { value: 'old-pass' } });
    fireEvent.change(screen.getByLabelText('새 비밀번호'), { target: { value: 'NewPass1!' } });
    fireEvent.change(screen.getByLabelText('새 비밀번호 확인'), { target: { value: 'Different1!' } });
    fireEvent.click(screen.getByRole('button', { name: '변경하기' }));

    expect(await screen.findByText('새 비밀번호와 같지 않아요.')).toBeTruthy();
    expect(put).not.toHaveBeenCalled();
  });
});

describe('새 비밀번호 규칙', () => {
  it('UTF-8 바이트로 길이를 센다(한글 1자는 3바이트)', () => {
    expect(getUtf8ByteLength('a')).toBe(1);
    expect(getUtf8ByteLength('가')).toBe(3);
    expect(getNewPasswordError('a'.repeat(72))).toBeNull();
    expect(getNewPasswordError('a'.repeat(73))).not.toBeNull();
    expect(getNewPasswordError('가'.repeat(24))).toBeNull();
    expect(getNewPasswordError('가'.repeat(25))).not.toBeNull();
  });

  it('공백을 거부한다', () => {
    expect(getNewPasswordError('abc def')).not.toBeNull();
    expect(getNewPasswordError('abcdef')).toBeNull();
  });
});
