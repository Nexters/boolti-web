// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('~/constants/link', () => ({
  LINK: {
    IOS_STORE: '#ios-store',
    ANDROID_STORE: '#android-store',
  },
}));

import { getStoreLink, openStoreLink } from './link';

const setUserAgent = (value: string) => {
  Object.defineProperty(window.navigator, 'userAgent', {
    value,
    configurable: true,
  });
};

describe('getStoreLink', () => {
  beforeEach(() => {
    setUserAgent('Mozilla/5.0');
  });

  afterEach(() => {
    window.history.replaceState({}, '', '/');
  });

  it('iOS userAgent면 iOS 스토어 링크를 반환한다', () => {
    setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)');
    expect(getStoreLink()).toBe('#ios-store');
  });

  it('iOS가 아니면 안드로이드 스토어 링크를 반환한다', () => {
    setUserAgent('Mozilla/5.0 (Linux; Android 14; Pixel 8)');
    expect(getStoreLink()).toBe('#android-store');
  });

  it('userAgent 대소문자와 관계없이 iOS를 판별한다', () => {
    setUserAgent('MOZILLA/5.0 (IPHONE; CPU IPHONE OS 17_0 LIKE MAC OS X)');
    expect(getStoreLink()).toBe('#ios-store');
  });
});

describe('openStoreLink', () => {
  it('현재 userAgent에 맞는 스토어 링크로 이동한다', () => {
    setUserAgent('Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X)');

    openStoreLink();

    expect(window.location.hash).toBe('#ios-store');
  });
});
