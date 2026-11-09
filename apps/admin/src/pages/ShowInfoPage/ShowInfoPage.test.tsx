// @vitest-environment jsdom
import { ThemeProvider } from '@emotion/react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import breakpoint from '@boolti/ui/src/systems/breakpoint';
import palette from '@boolti/ui/src/systems/palette';
import typo from '@boolti/ui/src/systems/typo';

const {
  editShowInfoMock,
  refetchCastTeamListMock,
  refetchShowDetailMock,
  refetchShowSalesInfoMock,
  showSubmissionErrorToastMock,
  toastSuccessMock,
} = vi.hoisted(() => ({
  editShowInfoMock: vi.fn(),
  refetchCastTeamListMock: vi.fn(),
  refetchShowDetailMock: vi.fn(),
  refetchShowSalesInfoMock: vi.fn(),
  showSubmissionErrorToastMock: vi.fn(),
  toastSuccessMock: vi.fn(),
}));

vi.mock('@boolti/api', () => {
  const show = {
    castTeams: [],
    concertHallId: 1,
    date: new Date('2026-09-09T10:00:00.000Z'),
    host: { name: '주최자', phoneNumber: '010-1234-5678' },
    images: [{ path: '/poster.png', sequence: 1, thumbnailPath: '/poster-thumb.png' }],
    isEnded: false,
    latitude: 37.5,
    longitude: 127,
    name: '테스트 공연',
    notice: '<p>안내</p><script>alert(1)</script>',
    place: { detailAddress: '', name: '공연장', streetAddress: '서울시' },
    runningTime: 90,
  };
  const showSalesInfo = { salesEndTime: null, salesStartTime: null };
  const castTeamList: unknown[] = [];
  const uploadShowImageMock = vi.fn();

  return {
    useCastTeamList: () => ({ data: castTeamList, refetch: refetchCastTeamListMock }),
    useEditShowInfo: () => ({ mutateAsync: editShowInfoMock }),
    useShowDetail: () => ({ data: show, refetch: refetchShowDetailMock }),
    useShowSalesInfo: () => ({ data: showSalesInfo, refetch: refetchShowSalesInfoMock }),
    useUploadShowImage: () => ({ mutateAsync: uploadShowImageMock }),
  };
});

vi.mock('@boolti/ui', () => ({
  Button: ({
    children,
    onClick,
    type = 'button',
  }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  ),
  Drawer: ({ children, open }: React.PropsWithChildren<{ open: boolean }>) =>
    open ? <>{children}</> : null,
  ShowPreview: () => null,
  mq_lg: '@media (min-width: 1024px)',
  useConfirm: () => vi.fn(),
  useToast: () => ({
    error: vi.fn(),
    info: vi.fn(),
    success: toastSuccessMock,
    warning: vi.fn(),
  }),
}));

vi.mock('jotai', () => {
  const hostInfo = { hostName: '주최자', type: 'MAIN' };
  const setAtom = vi.fn();

  return {
    useAtom: () => [hostInfo],
    useSetAtom: () => setAtom,
  };
});
vi.mock('react-router-dom', () => ({ useParams: () => ({ showId: '1' }) }));
vi.mock('~/components/ShowDetailLayout', () => ({ middlewareAtom: {}, myHostInfoAtom: {} }));
vi.mock('~/components/ShowDetailUnauthorized', () => ({
  PAGE_PERMISSION: { '공연 정보': ['MAIN', 'MANAGER'] },
  default: () => null,
}));
vi.mock('~/components/ShowInfoFormContent/ShowBasicInfoFormContent', () => ({
  default: () => null,
}));
vi.mock('~/components/ShowInfoFormContent/ShowDetailInfoFormContent', () => ({
  default: () => null,
}));
vi.mock('~/components/ShowInfoFormContent/ShowCastInfoFormContent', () => ({
  default: () => null,
}));
vi.mock('~/components/ShareBanner', () => ({ ShareBanner: () => null }));
vi.mock('~/hooks/useBodyScrollLock', () => ({ useBodyScrollLock: () => undefined }));
vi.mock('~/hooks/useShowSubmissionErrorToast', () => ({
  default: () => showSubmissionErrorToastMock,
}));
vi.mock('@boolti/ui/src/components/Portal', () => ({
  default: ({ children }: React.PropsWithChildren) => <>{children}</>,
}));
vi.mock('./PreviewFrame', () => ({ default: () => null }));

import ShowInfoPage from './index';

const theme = { breakpoint, palette, typo };

describe('ShowInfoPage submission', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    editShowInfoMock.mockRejectedValue(new Error('WAF blocked'));
  });

  it('정제된 공연 내용으로 수정하고 실패하면 오류 토스트를 요청한다', async () => {
    render(
      <ThemeProvider theme={theme}>
        <ShowInfoPage />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: '저장하기' }));

    await waitFor(() =>
      expect(screen.getAllByRole('button', { name: '저장하기' })).toHaveLength(3),
    );

    await act(async () => {
      fireEvent.click(screen.getAllByRole('button', { name: '저장하기' })[1]);
    });

    await waitFor(() => expect(showSubmissionErrorToastMock).toHaveBeenCalledTimes(1));
    expect(editShowInfoMock).toHaveBeenCalledWith(
      expect.objectContaining({
        body: expect.objectContaining({ notice: '<p>안내</p>' }),
      }),
      expect.any(Object),
    );
    expect(refetchShowDetailMock).not.toHaveBeenCalled();
    expect(refetchShowSalesInfoMock).not.toHaveBeenCalled();
    expect(refetchCastTeamListMock).not.toHaveBeenCalled();
    expect(toastSuccessMock).not.toHaveBeenCalled();
  });
});
