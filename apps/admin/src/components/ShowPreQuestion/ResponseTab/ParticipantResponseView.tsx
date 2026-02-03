import { useState, useEffect } from 'react';
import { SearchIcon, ChevronRightIcon, ChevronLeftIcon, CloseIcon } from '@boolti/icon';
import {
  PreQuestionParticipantItem,
  PreQuestionParticipantDetailResponse,
} from '@boolti/api/src/types';
import Styled from './ResponseTab.styles';
import { highlightText } from '~/utils/highlight';

const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

interface ParticipantResponseViewProps {
  participants: PreQuestionParticipantItem[];
  selectedParticipant: PreQuestionParticipantDetailResponse | null;
  currentPage: number;
  totalPages: number;
  searchText: string;
  onSearchChange: (text: string) => void;
  onSelectParticipant: (reservationId: number) => void;
  onPageChange: (page: number) => void;
}

const ParticipantResponseView = ({
  participants,
  selectedParticipant,
  currentPage,
  totalPages,
  searchText,
  onSearchChange,
  onSelectParticipant,
  onPageChange,
}: ParticipantResponseViewProps) => {
  console.log(participants);
  console.log(selectedParticipant);
  const [localSearch, setLocalSearch] = useState(searchText);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearch);
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, onSearchChange]);

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 2; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return (
      <Styled.PaginationContainer>
        <Styled.PaginationButton
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeftIcon />
        </Styled.PaginationButton>
        {pages.map((page, index) =>
          typeof page === 'number' ? (
            <Styled.PaginationButton
              key={index}
              isActive={page === currentPage}
              onClick={() => onPageChange(page)}
            >
              {page}
            </Styled.PaginationButton>
          ) : (
            <span key={index}>...</span>
          ),
        )}
        <Styled.PaginationButton
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRightIcon />
        </Styled.PaginationButton>
      </Styled.PaginationContainer>
    );
  };

  return (
    <Styled.ParticipantContainer>
      {/* 참여자 목록 */}
      <Styled.ParticipantListSection>
        <Styled.ParticipantSearchContainer>
          <Styled.ParticipantSearchInput>
            <input
              type="text"
              placeholder="참여자명 검색"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />

            <Styled.ParticipantSearchInputButtonGroup>
              {localSearch !== '' && (
                <Styled.ResetButton onClick={() => setLocalSearch('')}>
                  <CloseIcon />
                </Styled.ResetButton>
              )}
              <Styled.SearchButton>
                <SearchIcon />
              </Styled.SearchButton>
            </Styled.ParticipantSearchInputButtonGroup>
          </Styled.ParticipantSearchInput>
        </Styled.ParticipantSearchContainer>

        <Styled.ParticipantList>
          {participants.map((participant) => (
            <Styled.ParticipantItem
              key={participant.reservationId}
              isSelected={selectedParticipant?.reservationId === participant.reservationId}
              onClick={() => onSelectParticipant(participant.reservationId)}
            >
              <Styled.ParticipantInfo>
                <Styled.ParticipantName
                  isSelected={selectedParticipant?.reservationId === participant.reservationId}
                >
                  {highlightText(participant.reservationName, localSearch, Styled.Highlight)}
                </Styled.ParticipantName>
                <Styled.ParticipantMeta>
                  {formatDateTime(participant.answeredAt)} · {participant.salesTicketTypeName} ·{' '}
                  {participant.ticketCount}매
                </Styled.ParticipantMeta>
              </Styled.ParticipantInfo>
              <Styled.ParticipantArrow>
                <ChevronRightIcon />
              </Styled.ParticipantArrow>
            </Styled.ParticipantItem>
          ))}
        </Styled.ParticipantList>

        {renderPagination()}
      </Styled.ParticipantListSection>

      {/* 응답 상세 */}
      <Styled.ParticipantDetailSection>
        {selectedParticipant ? (
          <>
            <Styled.ParticipantDetailHeader>
              <Styled.ParticipantDetailTitle>
                {selectedParticipant.reservationName} 응답 상세
              </Styled.ParticipantDetailTitle>
              <Styled.ParticipantDetailTimeWrapper>
                <Styled.ParticipantDetailTime>
                  작성
                  <span>{formatDateTime(selectedParticipant.createdAt)}</span>
                </Styled.ParticipantDetailTime>
                {selectedParticipant.modifiedAt !== selectedParticipant.createdAt && (
                  <Styled.ParticipantDetailTime>
                    수정
                    <span>{formatDateTime(selectedParticipant.modifiedAt)}</span>
                  </Styled.ParticipantDetailTime>
                )}
              </Styled.ParticipantDetailTimeWrapper>
            </Styled.ParticipantDetailHeader>

            <Styled.ParticipantDetailBody>
              {selectedParticipant.answers.map((answer) => (
                <Styled.ParticipantAnswerCard key={answer.preQuestionId}>
                  <Styled.ParticipantAnswerHeader>
                    {answer.question}
                    <Styled.RequiredMark>*</Styled.RequiredMark>
                  </Styled.ParticipantAnswerHeader>
                  <Styled.ParticipantAnswerContent isEmpty={!answer.answer}>
                    {answer.answer || '작성된 내용이 없어요'}
                  </Styled.ParticipantAnswerContent>
                </Styled.ParticipantAnswerCard>
              ))}
            </Styled.ParticipantDetailBody>
          </>
        ) : (
          <Styled.NoSelectionMessage>좌측에서 참여자를 선택해 주세요</Styled.NoSelectionMessage>
        )}
      </Styled.ParticipantDetailSection>
    </Styled.ParticipantContainer>
  );
};

export default ParticipantResponseView;
