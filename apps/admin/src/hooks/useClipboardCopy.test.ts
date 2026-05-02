// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useClipboardCopy } from './useClipboardCopy';

describe('useClipboardCopy', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('handleCopy 호출 시 copyFn이 실행되고 isCopied가 true가 된다', () => {
    const copyFn = vi.fn();
    const { result } = renderHook(() => useClipboardCopy(copyFn));

    act(() => {
      result.current.handleCopy();
    });

    expect(copyFn).toHaveBeenCalledTimes(1);
    expect(result.current.isCopied).toBe(true);
  });

  it('기본 duration(2000ms) 경과 후 isCopied가 false로 돌아온다', () => {
    const { result } = renderHook(() => useClipboardCopy(() => {}));

    act(() => {
      result.current.handleCopy();
    });
    expect(result.current.isCopied).toBe(true);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.isCopied).toBe(false);
  });

  it('커스텀 duration을 적용한다', () => {
    const { result } = renderHook(() => useClipboardCopy(() => {}, 500));

    act(() => {
      result.current.handleCopy();
    });
    act(() => {
      vi.advanceTimersByTime(499);
    });
    expect(result.current.isCopied).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current.isCopied).toBe(false);
  });
});
