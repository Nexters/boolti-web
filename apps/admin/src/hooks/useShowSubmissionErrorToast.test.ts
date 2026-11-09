// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { toastErrorMock } = vi.hoisted(() => ({ toastErrorMock: vi.fn() }));

vi.mock('@boolti/ui', () => ({
  useToast: () => ({
    error: toastErrorMock,
    success: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  }),
}));

import useShowSubmissionErrorToast from './useShowSubmissionErrorToast';

describe('useShowSubmissionErrorToast', () => {
  beforeEach(() => {
    toastErrorMock.mockClear();
  });

  it('등록 실패 메시지를 표시한다', () => {
    const { result } = renderHook(() => useShowSubmissionErrorToast('create'));

    act(() => result.current());

    expect(toastErrorMock).toHaveBeenCalledWith(
      '공연을 등록하지 못했어요. 잠시 후 다시 시도해 주세요.',
    );
  });

  it('수정 실패 메시지를 표시한다', () => {
    const { result } = renderHook(() => useShowSubmissionErrorToast('edit'));

    act(() => result.current());

    expect(toastErrorMock).toHaveBeenCalledWith(
      '공연을 수정하지 못했어요. 잠시 후 다시 시도해 주세요.',
    );
  });
});
