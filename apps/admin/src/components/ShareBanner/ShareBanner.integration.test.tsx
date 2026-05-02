// @vitest-environment jsdom
// 통합 테스트 목적:
// 1) useShareBannerVisibility.isVisible 값에 따라 배너가 렌더링/비렌더링 되는지 검증
// 2) 닫기 버튼 클릭 시 dismissForToday가 호출되는지 검증
// 3) 공유 버튼 클릭 시 navigator.share가 호출되는지 검증
import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ShareBanner } from './index';
import { useShareBannerVisibility } from '~/hooks/useShareBannerVisibility';

vi.mock('~/hooks/useShareBannerVisibility', () => ({
  useShareBannerVisibility: vi.fn(),
}));

vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('@boolti/icon', () => ({
  CloseIcon: () => <span>close-icon</span>,
}));

vi.mock('./ShareBanner.styles', () => ({
  Container: (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />,
  CloseButton: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button type="button" aria-label="배너 닫기" {...props} />
  ),
  Text: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p {...props} />,
  ShareButton: (
    props: React.ButtonHTMLAttributes<HTMLButtonElement> & { colorTheme?: string; size?: string },
  ) => {
    const { colorTheme, size, ...domProps } = props;
    void colorTheme;
    void size;
    return <button type={props.type ?? 'button'} {...domProps} />;
  },
}));

const mockedUseShareBannerVisibility = vi.mocked(useShareBannerVisibility);

afterEach(() => {
  cleanup();
});

describe('ShareBanner integration', () => {
  it('isVisible이 false면 배너를 렌더링하지 않는다', () => {
    mockedUseShareBannerVisibility.mockReturnValue({
      isVisible: false,
      dismissForToday: vi.fn(),
    });

    render(<ShareBanner text="공유 배너" />);
    expect(screen.queryByText('공유 배너')).toBeNull();
  });

  it('닫기 버튼 클릭 시 dismissForToday를 호출한다', () => {
    const dismissForToday = vi.fn();
    mockedUseShareBannerVisibility.mockReturnValue({
      isVisible: true,
      dismissForToday,
    });

    render(<ShareBanner text="공유 배너" />);
    fireEvent.click(screen.getByLabelText('배너 닫기'));

    expect(dismissForToday).toHaveBeenCalledTimes(1);
  });

  it('공유 버튼 클릭 시 navigator.share를 호출한다', async () => {
    const dismissForToday = vi.fn();
    mockedUseShareBannerVisibility.mockReturnValue({
      isVisible: true,
      dismissForToday,
    });

    const share = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'share', {
      value: share,
      configurable: true,
    });

    render(<ShareBanner text="공유 배너" />);
    fireEvent.click(screen.getByRole('button', { name: '링크 공유' }));

    expect(share).toHaveBeenCalledTimes(1);
    expect(share).toHaveBeenCalledWith({
      url: window.location.href,
    });
  });
});
