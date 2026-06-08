// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { navigateToAppScheme } from './app';

const setUserAgent = (value: string) => {
  Object.defineProperty(window.navigator, 'userAgent', {
    value,
    configurable: true,
  });
};

const setDocumentHidden = (value: boolean) => {
  Object.defineProperty(document, 'hidden', {
    value,
    configurable: true,
  });
};

describe('navigateToAppScheme', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    setDocumentHidden(false);
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = '';
  });

  it('iOS에서 blur 이벤트가 발생하면 true를 반환한다', async () => {
    setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)');

    const promise = navigateToAppScheme('#boolti-app');
    window.dispatchEvent(new Event('blur'));

    await expect(promise).resolves.toBe(true);
  });

  it('iOS에서 앱 전환 이벤트가 없으면 timeout 후 false를 반환한다', async () => {
    setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)');

    const promise = navigateToAppScheme('#boolti-app');
    vi.advanceTimersByTime(1500);

    await expect(promise).resolves.toBe(false);
  });

  it('iOS에서 visibilitychange로 hidden 상태가 되면 true를 반환한다', async () => {
    setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)');

    const promise = navigateToAppScheme('#boolti-app');
    setDocumentHidden(true);
    document.dispatchEvent(new Event('visibilitychange'));

    await expect(promise).resolves.toBe(true);
  });

  it('비 iOS에서 visibilitychange로 hidden 상태가 되면 true를 반환한다', async () => {
    setUserAgent('Mozilla/5.0 (Linux; Android 14; Pixel 8)');

    const promise = navigateToAppScheme('#boolti-app');
    setDocumentHidden(true);
    document.dispatchEvent(new Event('visibilitychange'));

    await expect(promise).resolves.toBe(true);
  });

  it('비 iOS에서 timeout 시 false를 반환하고 생성한 iframe을 제거한다', async () => {
    setUserAgent('Mozilla/5.0 (Linux; Android 14; Pixel 8)');

    const promise = navigateToAppScheme('#boolti-app');
    expect(document.querySelectorAll('iframe').length).toBe(1);

    vi.advanceTimersByTime(1000);

    await expect(promise).resolves.toBe(false);
    expect(document.querySelectorAll('iframe').length).toBe(0);
  });

  it('비 iOS에서 blur 이벤트가 발생하면 true를 반환한다', async () => {
    setUserAgent('Mozilla/5.0 (Linux; Android 14; Pixel 8)');

    const promise = navigateToAppScheme('#boolti-app');
    window.dispatchEvent(new Event('blur'));

    await expect(promise).resolves.toBe(true);
  });
});
