// @vitest-environment jsdom
// 통합 테스트 목적:
// 1) LandingPage가 HOME 팝업 데이터를 조회하는지 검증
// 2) 조회된 popupData를 usePopupDialog에 전달하는지 검증
import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Popup } from '@boolti/api';
import type { ReactNode } from 'react';

const mockUsePopup = vi.fn();
const mockUsePopupDialog = vi.fn();

vi.mock('@boolti/api', () => ({
  usePopup: (...args: unknown[]) => mockUsePopup(...args),
}));

vi.mock('@boolti/ui', () => ({
  Footer: () => <div>Footer</div>,
}));

vi.mock('~/hooks/usePopupDialog', () => ({
  default: (...args: unknown[]) => mockUsePopupDialog(...args),
}));

vi.mock('./components', () => ({
  Header: () => <div>Header</div>,
  Hero: () => <div>Hero</div>,
  HowToUse: () => <div>HowToUse</div>,
  Problem: () => <div>Problem</div>,
  SolutionFeatures: () => <div>SolutionFeatures</div>,
  SolutionHighlight: () => <div>SolutionHighlight</div>,
}));

vi.mock('./LandingPage.styles', () => ({
  default: {
    Container: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    FooterContainer: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  },
}));

import LandingPage from './index';

describe('LandingPage integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('HOME 팝업 데이터를 조회하고 usePopupDialog에 전달한다', () => {
    const popupData = {
      id: 22,
      type: 'NOTICE',
      description: 'notice',
      noticeTitle: '공지',
      eventUrl: 'https://example.com',
      startDate: '2026-01-01T00:00:00.000Z',
      endDate: '2026-12-31T23:59:59.999Z',
    } satisfies Popup;

    mockUsePopup.mockReturnValue({ data: popupData });

    render(<LandingPage />);

    expect(mockUsePopup).toHaveBeenCalledWith('HOME');
    expect(mockUsePopupDialog).toHaveBeenCalledWith(popupData);
  });
});
