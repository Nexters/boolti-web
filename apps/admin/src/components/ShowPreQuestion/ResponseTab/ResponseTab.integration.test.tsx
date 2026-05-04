// @vitest-environment jsdom
// 통합 테스트 목적:
// 1) 응답자가 0명일 때 EmptyView가 노출되는지 검증
// 2) 질문별/참여자별 뷰 전환이 동작하는지 검증
// 3) 모바일 질문별 뷰에서 정렬 토글이 최신/오래된 순으로 전환되는지 검증
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { forwardRef, type ReactNode } from 'react';

import type { PreQuestionItem } from '@boolti/api/src/types';

const mockIsMobile = vi.fn();

vi.mock('@boolti/api', () => ({
  usePreQuestionAnswersList: () => [{ data: { content: [], totalElements: 0 }, isLoading: false, isFetching: false }],
  usePreQuestionParticipants: () => ({ data: { content: [] } }),
  usePreQuestionParticipantDetail: () => ({ data: null }),
  useSalesTicketTypesSummary: () => ({ data: [] }),
}));

vi.mock('~/hooks/useIsMobile', () => ({
  useIsMobile: () => mockIsMobile(),
}));

vi.mock('./EmptyView', () => ({
  default: () => <div>EmptyView</div>,
}));

vi.mock('./QuestionResponseView', () => ({
  default: () => <div>QuestionResponseView</div>,
}));

vi.mock('./ParticipantResponseView', () => ({
  default: () => <div>ParticipantResponseView</div>,
}));

vi.mock('~/components/TicketNameFilter', () => ({
  default: () => <div>TicketNameFilter</div>,
}));

vi.mock('./ResponseTab.styles', () => ({
  default: {
    Container: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    HeaderContainer: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    SegmentButtonContainer: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    SegmentButton: ({
      children,
      onClick,
    }: {
      children: ReactNode;
      onClick?: () => void;
    }) => (
      <button type="button" onClick={onClick}>
        {children}
      </button>
    ),
    SortContainer: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    MobileQuestionSortToggle: ({
      children,
      onClick,
    }: {
      children: ReactNode;
      onClick?: () => void;
    }) => (
      <button type="button" onClick={onClick}>
        {children}
      </button>
    ),
    SortDropdown: forwardRef<HTMLDivElement, { children: ReactNode }>(({ children }, ref) => (
      <div ref={ref}>{children}</div>
    )),
    SortButton: ({
      children,
      onClick,
    }: {
      children: ReactNode;
      onClick?: () => void;
    }) => (
      <button type="button" onClick={onClick}>
        {children}
      </button>
    ),
    SortMenu: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    SortMenuItem: ({
      children,
      onClick,
    }: {
      children: ReactNode;
      onClick?: () => void;
    }) => (
      <button type="button" onClick={onClick}>
        {children}
      </button>
    ),
  },
}));

import ResponseTab from './index';

const questions: PreQuestionItem[] = [
  { id: 1, question: '질문 1', isRequired: true, sequence: 1 },
];

describe('ResponseTab integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsMobile.mockReturnValue(false);
  });

  afterEach(() => {
    cleanup();
  });

  it('응답자가 0명이면 EmptyView를 렌더링한다', () => {
    render(<ResponseTab showId={1} questions={questions} totalRespondentCount={0} />);
    expect(screen.getByText('EmptyView')).toBeTruthy();
  });

  it('질문별/참여자별 탭 전환이 동작한다', () => {
    render(<ResponseTab showId={1} questions={questions} totalRespondentCount={3} />);

    expect(screen.getByText('QuestionResponseView')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: '참여자별 응답' }));
    expect(screen.getByText('ParticipantResponseView')).toBeTruthy();
  });

  it('모바일 질문별 뷰에서 정렬 토글 시 레이블이 전환된다', () => {
    mockIsMobile.mockReturnValue(true);
    render(<ResponseTab showId={1} questions={questions} totalRespondentCount={3} />);

    const latestButtons = screen.getAllByRole('button', { name: /최신 순/ });
    const sortToggle = latestButtons[latestButtons.length - 1];
    expect(sortToggle).toBeTruthy();
    if (!sortToggle) {
      return;
    }
    fireEvent.click(sortToggle);
    expect(screen.getByRole('button', { name: /오래된 순/ })).toBeTruthy();
  });
});
