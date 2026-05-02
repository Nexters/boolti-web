// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useScrollDirection } from './useScrollDirection';

describe('useScrollDirection', () => {
  beforeEach(() => {
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      cb(0);
      return 0;
    });
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('초기 방향은 up이다', () => {
    const { result } = renderHook(() => useScrollDirection());
    expect(result.current).toBe('up');
  });

  it('스크롤이 증가하면 down으로 변경된다', () => {
    const { result } = renderHook(() => useScrollDirection());

    act(() => {
      window.scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe('down');
  });

  it('스크롤이 감소하면 up으로 변경된다', () => {
    const { result } = renderHook(() => useScrollDirection());

    act(() => {
      window.scrollY = 120;
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBe('down');

    act(() => {
      window.scrollY = 20;
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBe('up');
  });
});
