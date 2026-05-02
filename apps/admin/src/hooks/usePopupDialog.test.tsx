// @vitest-environment jsdom
import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Popup } from '@boolti/api';

import usePopupDialog from './usePopupDialog';
import { useDialog } from '@boolti/ui';
import useCookie from './useCookie';

vi.mock('@boolti/ui', () => ({
  useDialog: vi.fn(),
}));

vi.mock('./useCookie', () => ({
  default: vi.fn(),
}));

vi.mock('~/components/NoticePopupContent', () => ({
  default: () => null,
}));

vi.mock('~/components/EventPopupContent', () => ({
  default: () => null,
}));

const mockedUseDialog = vi.mocked(useDialog);
const mockedUseCookie = vi.mocked(useCookie);

const createPopup = (type: Popup['type']): Popup => ({
  id: 1,
  type,
  eventUrl: 'https://example.com',
  noticeTitle: '공지',
  description: 'desc',
  startDate: '2026-01-01T00:00:00.000Z',
  endDate: '2026-12-31T23:59:59.999Z',
});

describe('usePopupDialog', () => {
  let eventOpen: ReturnType<typeof vi.fn>;
  let noticeOpen: ReturnType<typeof vi.fn>;
  let callCount: number;

  beforeEach(() => {
    eventOpen = vi.fn();
    noticeOpen = vi.fn();
    callCount = 0;

    mockedUseDialog.mockImplementation(() => {
      callCount += 1;
      if (callCount === 1) {
        return { id: 'event-dialog', isOpen: false, open: eventOpen, close: vi.fn() };
      }
      return { id: 'notice-dialog', isOpen: false, open: noticeOpen, close: vi.fn() };
    });

    mockedUseCookie.mockReturnValue({
      getCookie: vi.fn(() => null),
      setCookie: vi.fn(),
      deleteCookie: vi.fn(),
    });
  });

  it('popupData가 없으면 다이얼로그를 열지 않는다', () => {
    renderHook(() => usePopupDialog(undefined));
    expect(eventOpen).not.toHaveBeenCalled();
    expect(noticeOpen).not.toHaveBeenCalled();
  });

  it('날짜 범위 밖이면 다이얼로그를 열지 않는다', () => {
    const popup: Popup = {
      ...createPopup('NOTICE'),
      startDate: '2099-01-01T00:00:00.000Z',
      endDate: '2099-12-31T23:59:59.999Z',
    };
    renderHook(() => usePopupDialog(popup));

    expect(eventOpen).not.toHaveBeenCalled();
    expect(noticeOpen).not.toHaveBeenCalled();
  });

  it('EVENT 팝업은 쿠키가 있으면 열지 않는다', () => {
    const getCookie = vi.fn(() => '1');
    mockedUseCookie.mockReturnValueOnce({
      getCookie,
      setCookie: vi.fn(),
      deleteCookie: vi.fn(),
    });
    renderHook(() => usePopupDialog(createPopup('EVENT')));
    expect(eventOpen).not.toHaveBeenCalled();
  });

  it('EVENT 팝업은 쿠키가 없으면 event 다이얼로그를 연다', () => {
    mockedUseCookie.mockReturnValueOnce({
      getCookie: vi.fn(() => null),
      setCookie: vi.fn(),
      deleteCookie: vi.fn(),
    });
    renderHook(() => usePopupDialog(createPopup('EVENT')));
    expect(eventOpen).toHaveBeenCalledTimes(1);
  });

  it('NOTICE 팝업이면 notice 다이얼로그를 연다', () => {
    renderHook(() => usePopupDialog(createPopup('NOTICE')));
    expect(noticeOpen).toHaveBeenCalledTimes(1);
  });

  it('NOTICE 팝업은 쿠키 유무와 관계없이 notice 다이얼로그를 연다', () => {
    mockedUseCookie.mockReturnValueOnce({
      getCookie: vi.fn(() => '1'),
      setCookie: vi.fn(),
      deleteCookie: vi.fn(),
    });

    renderHook(() => usePopupDialog(createPopup('NOTICE')));
    expect(noticeOpen).toHaveBeenCalledTimes(1);
  });
});
