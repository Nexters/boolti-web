// @vitest-environment jsdom
// 통합 테스트 목적:
// 1) 비로그인 + 일반 브라우저면 /home 접근 시 /login으로 리다이렉트되는지 검증
// 2) 로그인 상태면 /home 접근이 허용되는지 검증
// 3) 비로그인이라도 webview면 /home 접근이 허용되는지 검증
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mockIsLogin = vi.fn<() => boolean>();
const mockCheckIsWebView = vi.fn<() => boolean>();

vi.mock('~/atoms/useAuthAtom', () => ({
  useAuthAtom: () => ({
    isLogin: mockIsLogin,
  }),
}));

vi.mock('@boolti/bridge', () => ({
  checkIsWebView: () => mockCheckIsWebView(),
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    ScrollRestoration: () => null,
  };
});

import PrivateRoute from './routes/PrivateRoute';

const renderWithRoute = (isLogin: boolean, isWebView: boolean) => {
  mockIsLogin.mockReturnValue(isLogin);
  mockCheckIsWebView.mockReturnValue(isWebView);

  render(
    <MemoryRouter initialEntries={['/home']}>
      <Routes>
        <Route path="/login" element={<div>로그인 페이지</div>} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<div>홈 페이지</div>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
};

describe('PrivateRoute integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollTo = vi.fn();
  });

  afterEach(() => {
    cleanup();
  });

  it('비로그인 + 일반 브라우저면 /login으로 이동한다', async () => {
    renderWithRoute(false, false);

    expect(await screen.findByText('로그인 페이지')).toBeTruthy();
    expect(screen.queryByText('홈 페이지')).toBeNull();
  });

  it('로그인 상태면 /home 접근이 허용된다', async () => {
    renderWithRoute(true, false);

    expect(await screen.findByText('홈 페이지')).toBeTruthy();
    expect(screen.queryByText('로그인 페이지')).toBeNull();
  });

  it('비로그인이라도 webview면 /home 접근이 허용된다', async () => {
    renderWithRoute(false, true);

    expect(await screen.findByText('홈 페이지')).toBeTruthy();
    expect(screen.queryByText('로그인 페이지')).toBeNull();
  });
});
