// @vitest-environment jsdom
import { ThemeProvider } from '@emotion/react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import breakpoint from '@boolti/ui/src/systems/breakpoint';
import palette from '@boolti/ui/src/systems/palette';
import typo from '@boolti/ui/src/systems/typo';

const { addNonTicketingShowMock, navigateMock, showSubmissionErrorToastMock, uploadShowImageMock } =
  vi.hoisted(() => ({
    addNonTicketingShowMock: vi.fn(),
    navigateMock: vi.fn(),
    showSubmissionErrorToastMock: vi.fn(),
    uploadShowImageMock: vi.fn(),
  }));

vi.mock('@boolti/api', () => ({
  useAddNonTicketingShow: () => ({ mutateAsync: addNonTicketingShowMock, status: 'idle' }),
  useAddShow: () => ({ mutateAsync: vi.fn(), status: 'idle' }),
  useUploadShowImage: () => ({ mutateAsync: uploadShowImageMock, status: 'idle' }),
}));

vi.mock('@boolti/bridge', () => ({
  TOAST_DURATIONS: { SHORT: 1000 },
  checkIsWebView: () => false,
  isWebViewBridgeAvailable: () => false,
  navigateToShowDetail: vi.fn(),
  showToast: vi.fn(),
}));

vi.mock('@boolti/icon', () => ({ ArrowLeftIcon: () => null }));

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
  Checkbox: Object.assign(({ children }: React.PropsWithChildren) => <label>{children}</label>, {
    Label: ({ children }: React.PropsWithChildren) => <label>{children}</label>,
  }),
  StepProgressBar: () => null,
  mq_lg: '@media (min-width: 1024px)',
  useConfirm: () => vi.fn(),
  useToast: () => ({ error: vi.fn(), info: vi.fn(), success: vi.fn(), warning: vi.fn() }),
}));

vi.mock('react-router-dom', () => ({
  Navigate: () => null,
  useNavigate: () => navigateMock,
  useSearchParams: () => [new URLSearchParams('type=FREE')],
}));

vi.mock('~/components/ShowInfoFormContent/ShowBasicInfoFormContent', () => ({
  default: () => null,
}));
vi.mock('~/components/ShowInfoFormContent/ShowDetailInfoFormContent', () => {
  const MockShowDetailInfoFormContent = ({
    form,
  }: {
    form: { setValue: (name: string, value: string) => void };
  }) => {
    React.useEffect(() => {
      form.setValue('notice', '<p>안내</p><script>alert(1)</script>');
      form.setValue('hostName', '주최자');
      form.setValue('hostPhoneNumber', '010-1234-5678');
    }, [form]);

    return null;
  };

  return { default: MockShowDetailInfoFormContent };
});
vi.mock('~/components/ShowInfoFormContent/ShowInvitationTicketFormContent', () => ({
  default: () => null,
}));
vi.mock('~/components/ShowInfoFormContent/ShowPreQuestionFormContent', () => ({
  default: () => null,
}));
vi.mock('~/components/ShowInfoFormContent/ShowSalesTicketFormContent', () => ({
  default: () => null,
}));
vi.mock('~/components/ShowInfoFormContent/ShowTicketInfoFormContent', () => ({
  default: () => null,
}));
vi.mock('~/components/ShowInfoFormContent/ShowCastInfoFormContent', () => ({
  default: () => null,
}));
vi.mock('~/hooks/useShowSubmissionErrorToast', () => ({
  default: () => showSubmissionErrorToastMock,
}));

import ShowAddPage from './index';

const theme = { breakpoint, palette, typo };

describe('ShowAddPage submission', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    uploadShowImageMock.mockResolvedValue([]);
    addNonTicketingShowMock.mockRejectedValue(new Error('WAF blocked'));
  });

  it('정제된 공연 내용으로 등록하고 실패하면 오류 토스트를 요청한다', async () => {
    render(
      <ThemeProvider theme={theme}>
        <ShowAddPage step="detail" />
      </ThemeProvider>,
    );

    await act(async () => {
      fireEvent.click(screen.getAllByRole('button', { name: '공연 등록 완료하기' })[0]);
    });

    await waitFor(() => expect(showSubmissionErrorToastMock).toHaveBeenCalledTimes(1));
    expect(addNonTicketingShowMock).toHaveBeenCalledWith(
      expect.objectContaining({ notice: '<p>안내</p>', isNonTicketing: true }),
    );
    expect(navigateMock).not.toHaveBeenCalled();
  });
});
