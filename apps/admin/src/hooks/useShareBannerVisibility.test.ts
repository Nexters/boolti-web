// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useShareBannerVisibility } from './useShareBannerVisibility';
import { useScrollDirection } from './useScrollDirection';

vi.mock('./useScrollDirection', () => ({
  useScrollDirection: vi.fn(),
}));

const mockedUseScrollDirection = vi.mocked(useScrollDirection);
const DISMISS_KEY = 'share_banner_dismissed_at';

describe('useShareBannerVisibility', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    mockedUseScrollDirection.mockReturnValue('down');

    Object.defineProperty(window, 'innerHeight', {
      value: 1000,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 2000,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('초기에는 표시 조건이 충족되지 않아 isVisible이 false다', () => {
    const { result } = renderHook(() => useShareBannerVisibility());
    expect(result.current.isVisible).toBe(false);
  });

  it('체류시간 10초 충족 시 isVisible이 true가 된다', () => {
    const { result } = renderHook(() => useShareBannerVisibility());

    act(() => {
      vi.advanceTimersByTime(10000);
    });

    expect(result.current.isVisible).toBe(true);
  });

  it('스크롤 진행률이 50% 이상이면 isVisible이 true가 된다', () => {
    const { result } = renderHook(() => useShareBannerVisibility());

    act(() => {
      window.scrollY = 500;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.isVisible).toBe(true);
  });

  it('scrollDirection이 up이면 조건 충족이어도 표시하지 않는다', () => {
    mockedUseScrollDirection.mockReturnValue('up');
    const { result } = renderHook(() => useShareBannerVisibility());

    act(() => {
      vi.advanceTimersByTime(10000);
    });

    expect(result.current.isVisible).toBe(false);
  });

  it('스크롤 가능한 영역이 없으면 진행률 조건으로 표시되지 않는다', () => {
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 1000,
      writable: true,
      configurable: true,
    });
    const { result } = renderHook(() => useShareBannerVisibility());

    act(() => {
      window.scrollY = 500;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.isVisible).toBe(false);
  });

  it('오늘 dismiss된 상태면 표시하지 않고 dismissForToday가 저장을 갱신한다', () => {
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
    const { result } = renderHook(() => useShareBannerVisibility());

    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(result.current.isVisible).toBe(false);

    act(() => {
      result.current.dismissForToday();
    });
    expect(localStorage.getItem(DISMISS_KEY)).not.toBeNull();
    expect(result.current.isVisible).toBe(false);
  });
});
