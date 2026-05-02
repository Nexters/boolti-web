// @vitest-environment jsdom
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useIsMobile } from './useIsMobile';
import { useDeviceWidth } from './useDeviceWidth';
import { useTheme } from '@emotion/react';

vi.mock('./useDeviceWidth', () => ({
  useDeviceWidth: vi.fn(),
}));

vi.mock('@emotion/react', () => ({
  useTheme: vi.fn(),
}));

const mockedUseDeviceWidth = vi.mocked(useDeviceWidth);
const mockedUseTheme = vi.mocked(useTheme);

describe('useIsMobile', () => {
  it('기기 너비가 모바일 breakpoint보다 작으면 true를 반환한다', () => {
    mockedUseDeviceWidth.mockReturnValue(375);
    mockedUseTheme.mockReturnValue({
      breakpoint: { mobile: '768px' },
    } as never);

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('기기 너비가 모바일 breakpoint 이상이면 false를 반환한다', () => {
    mockedUseDeviceWidth.mockReturnValue(1024);
    mockedUseTheme.mockReturnValue({
      breakpoint: { mobile: '768px' },
    } as never);

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });
});
