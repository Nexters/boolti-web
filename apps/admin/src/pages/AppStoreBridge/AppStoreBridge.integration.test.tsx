// @vitest-environment jsdom
// 통합 테스트 목적:
// 1) iOS에서는 스킴 호출 없이 openStoreLink를 즉시 호출하는지 검증
// 2) non-iOS에서 navigateToAppScheme 실패 시 openStoreLink로 폴백하는지 검증
// 3) non-iOS에서 navigateToAppScheme 성공 시 폴백 호출을 하지 않는지 검증
import { render, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('~/utils/app', () => ({
  navigateToAppScheme: vi.fn(),
}));

vi.mock('~/utils/link', () => ({
  openStoreLink: vi.fn(),
}));

import AppStoreBridge from './index';
import { navigateToAppScheme } from '~/utils/app';
import { openStoreLink } from '~/utils/link';

const setUserAgent = (value: string) => {
  Object.defineProperty(window.navigator, 'userAgent', {
    value,
    configurable: true,
  });
};

describe('AppStoreBridge integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('iOS에서는 스토어 링크를 바로 연다', async () => {
    setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)');

    render(<AppStoreBridge />);

    await waitFor(() => {
      expect(openStoreLink).toHaveBeenCalledTimes(1);
    });
    expect(navigateToAppScheme).not.toHaveBeenCalled();
  });

  it('비 iOS에서 스킴 호출 실패 시 스토어 링크로 폴백한다', async () => {
    setUserAgent('Mozilla/5.0 (Linux; Android 14; Pixel 8)');
    vi.mocked(navigateToAppScheme).mockResolvedValue(false);

    render(<AppStoreBridge />);

    await waitFor(() => {
      expect(navigateToAppScheme).toHaveBeenCalledTimes(1);
      expect(openStoreLink).toHaveBeenCalledTimes(1);
    });
  });

  it('비 iOS에서 스킴 호출 성공 시 스토어 링크를 열지 않는다', async () => {
    setUserAgent('Mozilla/5.0 (Linux; Android 14; Pixel 8)');
    vi.mocked(navigateToAppScheme).mockResolvedValue(true);

    render(<AppStoreBridge />);

    await waitFor(() => {
      expect(navigateToAppScheme).toHaveBeenCalledTimes(1);
    });
    expect(openStoreLink).not.toHaveBeenCalled();
  });
});
