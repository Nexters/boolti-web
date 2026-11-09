// @vitest-environment jsdom
import { cleanup, render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

const { identifyUser, isAnalyticsWebView, fetchQuery, isLogin } = vi.hoisted(() => ({
  identifyUser: vi.fn(),
  isAnalyticsWebView: vi.fn(),
  fetchQuery: vi.fn(),
  isLogin: vi.fn(),
}));
vi.mock('@boolti/analytics', () => ({ identifyUser, isAnalyticsWebView }));
vi.mock('@boolti/api', () => ({
  queryKeys: { user: { profile: {} } },
  useQueryClient: () => ({ fetchQuery }),
}));
vi.mock('~/atoms/useAuthAtom', () => ({ useAuthAtom: () => ({ isLogin }) }));

import AnalyticsUserIdentifier from './index';

beforeEach(() => {
  vi.resetAllMocks();
  isLogin.mockReturnValue(true);
  isAnalyticsWebView.mockReturnValue(false);
  fetchQuery.mockResolvedValue({ id: 42, userCode: 'viewer', nickname: 'name', email: 'email' });
});
afterEach(cleanup);

it('uses the browser profile ID without passing name or email to analytics', async () => {
  render(<AnalyticsUserIdentifier />);
  await waitFor(() => expect(identifyUser).toHaveBeenCalledWith({ id: 42, userCode: 'viewer' }));
});

it('does not look up or overwrite native identity even with browser login tokens', () => {
  isAnalyticsWebView.mockReturnValue(true);
  render(<AnalyticsUserIdentifier />);
  expect(fetchQuery).not.toHaveBeenCalled();
  expect(identifyUser).not.toHaveBeenCalled();
});

it('does not request a profile for a browser guest', () => {
  isLogin.mockReturnValue(false);
  render(<AnalyticsUserIdentifier />);
  expect(fetchQuery).not.toHaveBeenCalled();
});

it('keeps profile failures from interrupting the screen', async () => {
  fetchQuery.mockRejectedValue(new Error('offline'));
  render(<AnalyticsUserIdentifier />);
  await waitFor(() => expect(fetchQuery).toHaveBeenCalledOnce());
  expect(identifyUser).not.toHaveBeenCalled();
});
