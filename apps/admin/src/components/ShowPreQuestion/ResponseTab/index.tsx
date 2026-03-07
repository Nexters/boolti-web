import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { ChevronDownIcon } from '@boolti/icon';
import {
  usePreQuestionAnswersList,
  usePreQuestionParticipants,
  usePreQuestionParticipantDetail,
  useSalesTicketTypesSummary,
} from '@boolti/api';
import {
  PreQuestionItem,
  PreQuestionAnswerItem,
  PreQuestionParticipantItem,
  PreQuestionParticipantDetailResponse,
} from '@boolti/api/src/types';

import Styled from './ResponseTab.styles';
import EmptyView from './EmptyView';
import QuestionResponseView from './QuestionResponseView';
import ParticipantResponseView from './ParticipantResponseView';
import TicketNameFilter from '~/components/TicketNameFilter';

type ViewType = 'question' | 'participant';
type SortOrder = 'latest' | 'oldest';
const PARTICIPANT_PAGE_SIZE = 5;

interface ResponseTabProps {
  showId: number;
  questions: PreQuestionItem[];
  totalRespondentCount: number;
}

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: 'latest', label: '최신 순' },
  { value: 'oldest', label: '오래된 순' },
];

const ResponseTab = ({ showId, questions, totalRespondentCount }: ResponseTabProps) => {
  const [viewType, setViewType] = useState<ViewType>('question');
  const [sortOrder, setSortOrder] = useState<SortOrder>('latest');
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // 티켓 필터 상태
  const [selectedTicketIds, setSelectedTicketIds] = useState<string[]>([]);

  // 참여자별 응답 상태
  const [participantPage, setParticipantPage] = useState(1);
  const [participantSearchText, setParticipantSearchText] = useState('');
  const [selectedReservationId, setSelectedReservationId] = useState<number | null>(null);
  const shouldForceSelectFirstParticipantRef = useRef(false);
  const shouldFetchResponseData = totalRespondentCount > 0;

  // 티켓 목록 조회
  const { data: ticketTypesSummary } = useSalesTicketTypesSummary(showId, {
    enabled: shouldFetchResponseData,
  });
  const ticketOptions = (ticketTypesSummary ?? []).map((ticket) => ({
    label: ticket.ticketName,
    value: String(ticket.id),
  }));

  const selectedTicketIdSet = useMemo(
    () => new Set(selectedTicketIds.map((id) => Number(id))),
    [selectedTicketIds],
  );

  // 정렬 파라미터 변환
  const answersSortParam = sortOrder === 'latest' ? 'createdAt,DESC' : 'createdAt,ASC';
  const participantsSortParam = sortOrder === 'latest' ? 'answeredAt,DESC' : 'answeredAt,ASC';

  // 필터 파라미터 (선택된 티켓 ID를 쉼표로 연결)
  const ticketFilterParam = selectedTicketIds.length > 0 ? selectedTicketIds.join(',') : undefined;

  // 질문별 응답 조회 - 질문 개수만큼 동적으로 조회
  const questionAnswersQueries = usePreQuestionAnswersList(
    showId,
    questions.map((question) => question.id),
    0,
    100, // 충분히 큰 수로 설정
    ticketFilterParam,
    answersSortParam,
    { enabled: shouldFetchResponseData },
  );

  const answersMap = useMemo(() => {
    const newMap = new Map<number, { answers: PreQuestionAnswerItem[]; totalCount: number }>();
    const filterAnswersBySelectedTicket = (answers: PreQuestionAnswerItem[]) => {
      if (selectedTicketIdSet.size === 0) {
        return answers;
      }
      return answers.filter((answer) => selectedTicketIdSet.has(answer.salesTicketTypeId));
    };

    questions.forEach((question, index) => {
      const questionAnswers = questionAnswersQueries[index]?.data;
      if (!questionAnswers) {
        return;
      }

      const filteredAnswers = filterAnswersBySelectedTicket(questionAnswers.content ?? []);
      newMap.set(question.id, {
        answers: filteredAnswers,
        totalCount:
          selectedTicketIdSet.size > 0
            ? filteredAnswers.length
            : questionAnswers.totalElements ?? 0,
      });
    });

    return newMap;
  }, [questions, questionAnswersQueries, selectedTicketIdSet]);
  const isQuestionAnswersLoading = useMemo(
    () => questionAnswersQueries.some((query) => query?.isLoading || query?.isFetching),
    [questionAnswersQueries],
  );
  const totalFilteredQuestionAnswers = useMemo(
    () =>
      questions.reduce((sum, question) => {
        const answerData = answersMap.get(question.id);
        return sum + (answerData?.totalCount ?? 0);
      }, 0),
    [answersMap, questions],
  );
  const isQuestionFilterEmpty =
    selectedTicketIds.length > 0 && !isQuestionAnswersLoading && totalFilteredQuestionAnswers === 0;

  const participantFetchSize = Math.max(totalRespondentCount, PARTICIPANT_PAGE_SIZE);

  // 참여자 목록 조회 (전체 조회 후 프론트에서 필터/페이지네이션 처리)
  const { data: participantsData } = usePreQuestionParticipants(
    showId,
    0,
    participantFetchSize,
    ticketFilterParam,
    participantSearchText || undefined,
    participantsSortParam,
    { enabled: shouldFetchResponseData },
  );

  // 선택된 참여자 상세 조회 (selectedReservationId가 있을 때만 실행)
  const { data: participantDetail } = usePreQuestionParticipantDetail(
    showId,
    selectedReservationId ?? 0,
    { enabled: shouldFetchResponseData && selectedReservationId !== null },
  );

  const filteredParticipants = useMemo(() => {
    const participantList = participantsData?.content ?? [];
    if (selectedTicketIdSet.size === 0) {
      return participantList;
    }
    return participantList.filter((participant) => selectedTicketIdSet.has(participant.salesTicketTypeId));
  }, [participantsData?.content, selectedTicketIdSet]);

  const totalPages = Math.ceil(filteredParticipants.length / PARTICIPANT_PAGE_SIZE);
  const participants: PreQuestionParticipantItem[] = useMemo(() => {
    const startIndex = (participantPage - 1) * PARTICIPANT_PAGE_SIZE;
    return filteredParticipants.slice(startIndex, startIndex + PARTICIPANT_PAGE_SIZE);
  }, [filteredParticipants, participantPage]);
  const selectedParticipantDetail: PreQuestionParticipantDetailResponse | null =
    participantDetail ?? null;

  useEffect(() => {
    if (totalPages === 0 && participantPage !== 1) {
      setParticipantPage(1);
      return;
    }
    if (totalPages > 0 && participantPage > totalPages) {
      setParticipantPage(totalPages);
    }
  }, [participantPage, totalPages]);

  // 참여자 목록이 로드되면 첫 번째 참여자 자동 선택
  useEffect(() => {
    const firstParticipant = participants[0];

    if (!firstParticipant) {
      setSelectedReservationId(null);
      shouldForceSelectFirstParticipantRef.current = false;
      return;
    }

    const hasSelectedParticipant = participants.some(
      (participant) => participant.reservationId === selectedReservationId,
    );

    if (
      shouldForceSelectFirstParticipantRef.current ||
      selectedReservationId === null ||
      !hasSelectedParticipant
    ) {
      setSelectedReservationId(firstParticipant.reservationId);
    }

    shouldForceSelectFirstParticipantRef.current = false;
  }, [participants, selectedReservationId]);

  // 클릭 외부 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = useCallback((text: string) => {
    shouldForceSelectFirstParticipantRef.current = true;
    setParticipantSearchText(text);
    setParticipantPage(1);
  }, []);

  const handleSelectParticipant = useCallback((reservationId: number) => {
    setSelectedReservationId(reservationId);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setParticipantPage(page);
  }, []);

  const handleSortChange = (order: SortOrder) => {
    setSortOrder(order);
    setIsSortMenuOpen(false);
  };

  const handleTicketFilterChange = useCallback((values: string[]) => {
    setSelectedTicketIds(values);
    setParticipantPage(1);
    setSelectedReservationId(null);
  }, []);

  const handleTicketFilterReset = useCallback(() => {
    setSelectedTicketIds([]);
    setParticipantPage(1);
    setSelectedReservationId(null);
  }, []);

  // 응답이 없는 경우
  if (totalRespondentCount === 0) {
    return (
      <Styled.Container>
        <EmptyView />
      </Styled.Container>
    );
  }

  const currentSortLabel = SORT_OPTIONS.find((opt) => opt.value === sortOrder)?.label;

  return (
    <Styled.Container>
      <Styled.HeaderContainer>
        <Styled.SegmentButtonContainer>
          <Styled.SegmentButton
            isActive={viewType === 'question'}
            onClick={() => setViewType('question')}
          >
            질문별 응답
          </Styled.SegmentButton>
          <Styled.SegmentButton
            isActive={viewType === 'participant'}
            onClick={() => setViewType('participant')}
          >
            참여자별 응답
          </Styled.SegmentButton>
        </Styled.SegmentButtonContainer>

        <Styled.SortContainer>
          {ticketOptions.length > 0 && (
            <TicketNameFilter
              options={ticketOptions}
              selectedValues={selectedTicketIds}
              updateSelectValues={handleTicketFilterChange}
            />
          )}
          <Styled.SortDropdown ref={sortRef}>
            <Styled.SortButton
              data-open={isSortMenuOpen}
              onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
            >
              {currentSortLabel}
              <ChevronDownIcon />
            </Styled.SortButton>

            {isSortMenuOpen && (
              <Styled.SortMenu>
                {SORT_OPTIONS.map((option) => (
                  <Styled.SortMenuItem
                    key={option.value}
                    isActive={sortOrder === option.value}
                    onClick={() => handleSortChange(option.value)}
                  >
                    {option.label}
                  </Styled.SortMenuItem>
                ))}
              </Styled.SortMenu>
            )}
          </Styled.SortDropdown>
        </Styled.SortContainer>
      </Styled.HeaderContainer>

      {viewType === 'question' ? (
        <QuestionResponseView
          questions={questions}
          answersMap={answersMap}
          isFilterEmpty={isQuestionFilterEmpty}
          onResetFilter={handleTicketFilterReset}
        />
      ) : (
        <ParticipantResponseView
          participants={participants}
          selectedParticipant={selectedParticipantDetail}
          currentPage={participantPage}
          totalPages={totalPages}
          searchText={participantSearchText}
          isFilterApplied={selectedTicketIds.length > 0}
          onSearchChange={handleSearchChange}
          onResetFilter={handleTicketFilterReset}
          onSelectParticipant={handleSelectParticipant}
          onPageChange={handlePageChange}
        />
      )}
    </Styled.Container>
  );
};

export default ResponseTab;
