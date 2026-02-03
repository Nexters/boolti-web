import { useState, useEffect, useCallback } from 'react';
import {
  SearchIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  CloseIcon,
  BooltiGreyIcon,
} from '@boolti/icon';
import {
  PreQuestionParticipantItem,
  PreQuestionParticipantDetailResponse,
} from '@boolti/api/src/types';
import Styled from './ResponseTab.styles';
import { highlightText } from '~/utils/highlight';

const MOBILE_BREAKPOINT = 641;

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
  const [localSearch, setLocalSearch] = useState(searchText);
  const [isMobile, setIsMobile] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const isSearchEmpty = participants.length === 0 && localSearch.trim() !== '';

  // 모바일 환경 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    checkMobile();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // BottomSheet 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (isBottomSheetOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isBottomSheetOpen]);

  const handleSearchReset = () => {
    setLocalSearch('');
    onSearchChange('');
  };

  const handleSelectParticipant = useCallback(
    (reservationId: number) => {
      onSelectParticipant(reservationId);
      if (isMobile) {
        setIsBottomSheetOpen(true);
      }
    },
    [onSelectParticipant, isMobile],
  );

  const handleCloseBottomSheet = useCallback(() => {
    setIsBottomSheetOpen(false);
  }, []);

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
                <Styled.ResetButton onClick={handleSearchReset}>
                  <CloseIcon />
                </Styled.ResetButton>
              )}
              <Styled.SearchButton>
                <SearchIcon />
              </Styled.SearchButton>
            </Styled.ParticipantSearchInputButtonGroup>
          </Styled.ParticipantSearchInput>
        </Styled.ParticipantSearchContainer>

        {isSearchEmpty ? (
          <Styled.SearchEmptyContainer>
            <Styled.SearchEmptyIcon>
              <BooltiGreyIcon />
            </Styled.SearchEmptyIcon>
            <Styled.SearchEmptyText>
              검색 결과가 없어요.
              <br />
              참여자 이름을 변경해보세요.
            </Styled.SearchEmptyText>
            <Styled.SearchResetButton onClick={handleSearchReset}>
              검색 초기화
            </Styled.SearchResetButton>
          </Styled.SearchEmptyContainer>
        ) : (
          <>
            <Styled.ParticipantList>
              {participants.map((participant) => (
                <Styled.ParticipantItem
                  key={participant.reservationId}
                  isSelected={selectedParticipant?.reservationId === participant.reservationId}
                  onClick={() => handleSelectParticipant(participant.reservationId)}
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
          </>
        )}
      </Styled.ParticipantListSection>

      {/* 응답 상세 - 데스크톱에서만 표시 */}
      <Styled.ParticipantDetailSection>
        {selectedParticipant && !isSearchEmpty ? (
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
                    {answer.isRequired && <Styled.RequiredMark>*</Styled.RequiredMark>}
                  </Styled.ParticipantAnswerHeader>
                  <Styled.ParticipantAnswerContent isEmpty={!answer.answer}>
                    {answer.answer || '작성된 내용이 없어요'}
                  </Styled.ParticipantAnswerContent>
                </Styled.ParticipantAnswerCard>
              ))}
            </Styled.ParticipantDetailBody>
          </>
        ) : isSearchEmpty ? (
          <>
            <Styled.ParticipantDetailHeader>
              <Styled.ParticipantDetailTitle></Styled.ParticipantDetailTitle>
            </Styled.ParticipantDetailHeader>
            <Styled.ParticipantDetailBody isEmpty>
              <Styled.SearchEmptyIcon>
                <BooltiGreyIcon />
              </Styled.SearchEmptyIcon>
            </Styled.ParticipantDetailBody>
          </>
        ) : (
          <Styled.NoSelectionMessage>좌측에서 참여자를 선택해 주세요</Styled.NoSelectionMessage>
        )}
      </Styled.ParticipantDetailSection>

      {/* 모바일 BottomSheet */}
      <Styled.MobileBottomSheetOverlay isOpen={isBottomSheetOpen} onClick={handleCloseBottomSheet}>
        <Styled.MobileBottomSheet onClick={(e) => e.stopPropagation()}>
          {selectedParticipant && (
            <>
              <Styled.MobileBottomSheetHeader>
                <Styled.MobileBottomSheetHeaderContent>
                  <Styled.MobileBottomSheetTitle>
                    {selectedParticipant.reservationName} 응답 상세
                  </Styled.MobileBottomSheetTitle>
                  <Styled.MobileBottomSheetTimeWrapper>
                    <Styled.MobileBottomSheetTime>
                      작성
                      <span>{formatDateTime(selectedParticipant.createdAt)}</span>
                    </Styled.MobileBottomSheetTime>
                    {selectedParticipant.modifiedAt !== selectedParticipant.createdAt && (
                      <Styled.MobileBottomSheetTime>
                        수정
                        <span>{formatDateTime(selectedParticipant.modifiedAt)}</span>
                      </Styled.MobileBottomSheetTime>
                    )}
                  </Styled.MobileBottomSheetTimeWrapper>
                </Styled.MobileBottomSheetHeaderContent>
                <Styled.MobileBottomSheetCloseButton onClick={handleCloseBottomSheet}>
                  <CloseIcon />
                </Styled.MobileBottomSheetCloseButton>
              </Styled.MobileBottomSheetHeader>
              <Styled.MobileBottomSheetBody>
                {selectedParticipant.answers.map((answer) => (
                  <Styled.MobileAnswerCard key={answer.preQuestionId}>
                    <Styled.MobileAnswerCardHeader>
                      <Styled.MobileAnswerCardTitle>
                        {answer.question}
                        {answer.isRequired && <Styled.RequiredMark>*</Styled.RequiredMark>}
                      </Styled.MobileAnswerCardTitle>
                      {answer.description && (
                        <Styled.MobileAnswerCardDescription>
                          {answer.description}
                        </Styled.MobileAnswerCardDescription>
                      )}
                    </Styled.MobileAnswerCardHeader>
                    <Styled.MobileAnswerCardContent isEmpty={!answer.answer}>
                      {answer.answer || '작성한 내용이 없어요'}
                    </Styled.MobileAnswerCardContent>
                  </Styled.MobileAnswerCard>
                ))}
              </Styled.MobileBottomSheetBody>
            </>
          )}
        </Styled.MobileBottomSheet>
      </Styled.MobileBottomSheetOverlay>
    </Styled.ParticipantContainer>
  );
};

export default ParticipantResponseView;
