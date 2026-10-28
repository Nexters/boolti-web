import { afterEach, beforeEach, expect, it, vi } from 'vitest';

beforeEach(() => {
  vi.resetModules();
  vi.useFakeTimers();
  vi.spyOn(console, 'log').mockImplementation(() => {});
  vi.spyOn(console, 'warn').mockImplementation(() => {});
});
afterEach(() => {
  delete window.boolti;
  delete window.webkit;
  delete (window as Partial<Window>).__boolti__webview__bridge__;
  vi.useRealTimers();
  vi.restoreAllMocks();
});

const info = {
  platform: 'Android',
  osVersion: '14',
  appVersion: '1.15.0',
  deviceModel: 'SM-S918N',
  screenResolution: '1080x2340',
  isLoggedIn: false,
  userId: null,
};

it('requests client info and accepts a numeric response timestamp, clearing the timeout', async () => {
  const postMessage = vi.fn();
  window.boolti = { postMessage };
  const { requestClientInfo } = await import('../../bridge/src/commands/requestClientInfo');
  const request = requestClientInfo();
  await vi.advanceTimersByTimeAsync(0);
  const command = JSON.parse(postMessage.mock.calls[0][0]);
  expect(command.command).toBe('REQUEST_CLIENT_INFO');
  const response = { ...command, timestamp: 1761177600000, data: info };
  window.__boolti__webview__bridge__.postMessage(response);
  await expect(request).resolves.toEqual(response);
  await vi.advanceTimersByTimeAsync(5000);
  expect(console.warn).not.toHaveBeenCalled();
  const { messageListeners } = await import('../../bridge/src/commands/messageListeners');
  expect(messageListeners.size).toBe(0);
});

it('accepts the same response as JSON through the iOS bridge', async () => {
  const postMessage = vi.fn();
  window.webkit = { messageHandlers: { boolti: { postMessage } } };
  const { requestClientInfo } = await import('../../bridge/src/commands/requestClientInfo');
  const request = requestClientInfo();
  await vi.advanceTimersByTimeAsync(0);
  const command = JSON.parse(postMessage.mock.calls[0][0]);
  window.__boolti__webview__bridge__.postMessage(
    JSON.stringify({ ...command, data: { ...info, platform: 'iOS' } }),
  );
  await expect(request).resolves.toMatchObject({ data: { platform: 'iOS' } });
});

it('ignores an unrelated command even if its ID matches', async () => {
  const postMessage = vi.fn();
  window.boolti = { postMessage };
  const { requestClientInfo } = await import('../../bridge/src/commands/requestClientInfo');
  const request = requestClientInfo();
  await vi.advanceTimersByTimeAsync(0);
  const command = JSON.parse(postMessage.mock.calls[0][0]);
  const rejected = expect(request).rejects.toMatchObject({ command: 'REQUEST_CLIENT_INFO' });
  window.__boolti__webview__bridge__.postMessage({
    ...command,
    command: 'REQUEST_TOKEN',
    data: { token: 'not-client-info' },
  });
  await vi.advanceTimersByTimeAsync(5000);
  await rejected;
  const { messageListeners } = await import('../../bridge/src/commands/messageListeners');
  expect(messageListeners.size).toBe(0);
});

it('rejects a native send failure and releases its listener', async () => {
  window.boolti = {
    postMessage: () => {
      throw new Error('bridge unavailable');
    },
  };
  const { requestClientInfo } = await import('../../bridge/src/commands/requestClientInfo');
  const rejected = expect(requestClientInfo()).rejects.toThrow('bridge unavailable');
  await vi.advanceTimersByTimeAsync(0);
  await rejected;
  const { messageListeners } = await import('../../bridge/src/commands/messageListeners');
  expect(messageListeners.size).toBe(0);
  await vi.advanceTimersByTimeAsync(5000);
  expect(console.warn).not.toHaveBeenCalled();
});
