import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronDownIcon } from '@boolti/icon';
import {
  usePreQuestionAnswers,
  usePreQuestionParticipants,
  usePreQuestionParticipantDetail,
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

type ViewType = 'question' | 'participant';
type SortOrder = 'latest' | 'oldest';

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

  // 참여자별 응답 상태
  const [participantPage, setParticipantPage] = useState(1);
  const [participantSearchText, setParticipantSearchText] = useState('');
  const [selectedReservationId, setSelectedReservationId] = useState<number | null>(null);

  // 질문별 응답 데이터 - 각 질문에 대해 답변 조회
  const [answersMap, setAnswersMap] = useState<
    Map<number, { answers: PreQuestionAnswerItem[]; totalCount: number }>
  >(new Map());

  // 정렬 파라미터 변환
  const answersSortParam = sortOrder === 'latest' ? 'createdAt,desc' : 'createdAt,asc';
  const participantsSortParam: 'ASC' | 'DESC' = sortOrder === 'latest' ? 'DESC' : 'ASC';

  // 질문별 응답 조회 (첫 번째 질문만 useQuery로 조회, 나머지는 수동)
  const firstQuestion = questions[0];
  const { data: firstQuestionAnswers } = usePreQuestionAnswers(
    showId,
    firstQuestion?.id ?? 0,
    0,
    100, // 충분히 큰 수로 설정
    undefined,
    answersSortParam,
  );

  // 나머지 질문들의 답변도 가져오기 위한 훅들
  const secondQuestion = questions[1];
  const { data: secondQuestionAnswers } = usePreQuestionAnswers(
    showId,
    secondQuestion?.id ?? 0,
    0,
    100,
    undefined,
    answersSortParam,
  );

  const thirdQuestion = questions[2];
  const { data: thirdQuestionAnswers } = usePreQuestionAnswers(
    showId,
    thirdQuestion?.id ?? 0,
    0,
    100,
    undefined,
    answersSortParam,
  );

  // 응답 데이터 맵 업데이트
  useEffect(() => {
    const newMap = new Map<number, { answers: PreQuestionAnswerItem[]; totalCount: number }>();

    if (firstQuestion && firstQuestionAnswers) {
      newMap.set(firstQuestion.id, {
        answers: firstQuestionAnswers.content ?? [],
        totalCount: firstQuestionAnswers.totalElements ?? 0,
      });
    }

    if (secondQuestion && secondQuestionAnswers) {
      newMap.set(secondQuestion.id, {
        answers: secondQuestionAnswers.content ?? [],
        totalCount: secondQuestionAnswers.totalElements ?? 0,
      });
    }

    if (thirdQuestion && thirdQuestionAnswers) {
      newMap.set(thirdQuestion.id, {
        answers: thirdQuestionAnswers.content ?? [],
        totalCount: thirdQuestionAnswers.totalElements ?? 0,
      });
    }

    setAnswersMap(newMap);
  }, [
    firstQuestion,
    firstQuestionAnswers,
    secondQuestion,
    secondQuestionAnswers,
    thirdQuestion,
    thirdQuestionAnswers,
  ]);

  // 참여자 목록 조회
  const { data: participantsData } = usePreQuestionParticipants(
    showId,
    participantPage - 1, // 0-based page
    undefined,
    participantSearchText || undefined,
    participantsSortParam,
  );

  // 선택된 참여자 상세 조회 (selectedReservationId가 있을 때만 실행)
  const { data: participantDetail } = usePreQuestionParticipantDetail(
    showId,
    selectedReservationId ?? 0,
    { enabled: selectedReservationId !== null },
  );

  const participants: PreQuestionParticipantItem[] = participantsData?.content ?? [];
  const totalPages = participantsData?.totalPages ?? 0;
  const selectedParticipantDetail: PreQuestionParticipantDetailResponse | null =
    participantDetail ?? null;

  // 참여자 목록이 로드되면 첫 번째 참여자 자동 선택
  useEffect(() => {
    const firstParticipant = participantsData?.content?.[0];
    if (firstParticipant && selectedReservationId === null) {
      setSelectedReservationId(firstParticipant.reservationId);
    }
  }, [participantsData?.content, selectedReservationId]);

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
        <QuestionResponseView questions={questions} answersMap={answersMap} />
      ) : (
        <ParticipantResponseView
          participants={participants}
          selectedParticipant={selectedParticipantDetail}
          currentPage={participantPage}
          totalPages={totalPages}
          searchText={participantSearchText}
          onSearchChange={handleSearchChange}
          onSelectParticipant={handleSelectParticipant}
          onPageChange={handlePageChange}
        />
      )}
    </Styled.Container>
  );
};

export default ResponseTab;
