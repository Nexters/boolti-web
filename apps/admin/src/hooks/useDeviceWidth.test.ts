// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useDeviceWidth } from './useDeviceWidth';

describe('useDeviceWidth', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.defineProperty(window, 'innerWidth', {
      value: 1200,
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('초기값으로 window.innerWidth를 반환한다', () => {
    const { result } = renderHook(() => useDeviceWidth());
    expect(result.current).toBe(1200);
  });

  it('resize 이후 debounce(300ms) 경과 시 너비를 갱신한다', () => {
    const { result } = renderHook(() => useDeviceWidth());

    act(() => {
      window.innerWidth = 640;
      window.dispatchEvent(new Event('resize'));
    });
    expect(result.current).toBe(1200);

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe(640);
  });

  it('debounce 구간에 resize가 연속 발생하면 마지막 width를 반영한다', () => {
    const { result } = renderHook(() => useDeviceWidth());

    act(() => {
      window.innerWidth = 900;
      window.dispatchEvent(new Event('resize'));
      window.innerWidth = 700;
      window.dispatchEvent(new Event('resize'));
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe(700);
  });
});
