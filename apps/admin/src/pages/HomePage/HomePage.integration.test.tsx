// @vitest-environment jsdom
// 통합 테스트 목적:
// 1) HomePage가 HOME 팝업 데이터를 조회하는지 검증
// 2) 조회된 popupData를 usePopupDialog에 전달하는지 검증
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Popup } from '@boolti/api';
import type { ReactNode } from 'react';

const mockUsePopup = vi.fn();
const mockUsePopupDialog = vi.fn();

vi.mock('@boolti/api', () => ({
  queryKeys: {
    user: {
      summary: { queryKey: ['user', 'summary'] },
    },
  },
  useLogout: () => ({ mutateAsync: vi.fn() }),
  usePopup: (...args: unknown[]) => mockUsePopup(...args),
  useQueryClient: () => ({ removeQueries: vi.fn() }),
  useSettlementBanners: () => ({ data: [] }),
  useShowList: () => ({ data: [], isLoading: false }),
  useUserProfile: () => ({ data: null, isLoading: false }),
}));

vi.mock('@boolti/ui', () => ({
  Footer: () => <div>Footer</div>,
  useConfirm: () => vi.fn().mockResolvedValue(false),
  useDialog: () => ({ id: 'dialog', isOpen: false, open: vi.fn(), close: vi.fn() }),
}));

vi.mock('@boolti/bridge', () => ({
  checkIsWebView: () => false,
}));

vi.mock('~/components/Header', () => ({
  default: () => <div>Header</div>,
}));

vi.mock('~/components/Layout', () => ({
  default: ({
    children,
    header,
    headerMenu,
    banner,
  }: {
    children: ReactNode;
    header?: ReactNode;
    headerMenu?: ReactNode;
    banner?: ReactNode;
  }) => (
    <div>
      {header}
      {headerMenu}
      {banner}
      {children}
    </div>
  ),
}));

vi.mock('~/components/ShowList', () => ({
  default: () => <div>ShowList</div>,
}));

vi.mock('~/components/UserProfile', () => ({
  default: () => <div>UserProfile</div>,
}));

vi.mock('~/components/ProfileDropdown', () => ({
  default: () => <button type="button">ProfileDropdown</button>,
}));

vi.mock('~/components/SettingDialogContent', () => ({
  default: () => <div>SettingDialogContent</div>,
}));

vi.mock('~/components/ShowTypeSelectDialogContent', () => ({
  default: () => <div>ShowTypeSelectDialogContent</div>,
}));

vi.mock('~/atoms/useAuthAtom', () => ({
  useAuthAtom: () => ({ removeToken: vi.fn() }),
}));

vi.mock('~/hooks/usePopupDialog', () => ({
  default: (...args: unknown[]) => mockUsePopupDialog(...args),
}));

vi.mock('./HomePage.styles', () => ({
  default: {
    Logo: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    ProfileDropdown: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    ProfileDropdownMobile: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    HeaderMenu: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    HeaderMenuItemButton: ({
      children,
      onClick,
    }: {
      children: ReactNode;
      onClick?: () => void | Promise<void>;
    }) => (
      <button type="button" onClick={onClick}>
        {children}
      </button>
    ),
    BannerContainer: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    Banner: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    BannerDescription: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    BannerShowTitle: ({ children }: { children: ReactNode }) => <span>{children}</span>,
    BannerLink: ({ children }: { children: ReactNode }) => <a href="#">{children}</a>,
    Container: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  },
}));

import HomePage from './index';

describe('HomePage integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('HOME 팝업 데이터를 조회하고 usePopupDialog에 전달한다', () => {
    const popupData = {
      id: 11,
      type: 'EVENT',
      description: 'banner',
      noticeTitle: 'title',
      eventUrl: 'https://example.com',
      startDate: '2026-01-01T00:00:00.000Z',
      endDate: '2026-12-31T23:59:59.999Z',
    } satisfies Popup;

    mockUsePopup.mockReturnValue({ data: popupData });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(mockUsePopup).toHaveBeenCalledWith('HOME');
    expect(mockUsePopupDialog).toHaveBeenCalledWith(popupData);
  });
});
