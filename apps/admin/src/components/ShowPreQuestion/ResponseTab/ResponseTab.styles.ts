import styled from '@emotion/styled';
import { mq_lg } from '@boolti/ui';

// ===== 공통 =====
export const Container = styled.div`
  width: 100%;
`;

// ===== 응답 없음 화면 =====
export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 120px 20px;
  text-align: center;
`;

export const EmptyIcon = styled.div`
  width: 60px;
  height: 60px;
  margin-bottom: 16px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const EmptyText = styled.p`
  ${({ theme }) => theme.typo.b4};
  color: ${({ theme }) => theme.palette.grey.g40};
`;

// ===== 세그먼트 버튼 =====
export const SegmentButtonContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
  background-color: ${({ theme }) => theme.palette.grey.g00};
  border-radius: 8px;
  gap: 4px;
`;

export const SegmentButton = styled.button<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 123px;
  height: 44px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;

  ${({ theme, isActive }) =>
    isActive
      ? `
        background-color: ${theme.palette.grey.w};
        box-shadow: 0px 8px 14px 0px rgba(139, 139, 139, 0.15);
        ${theme.typo.sh1};
        color: ${theme.palette.grey.g90};
      `
      : `
        background-color: transparent;
        ${theme.typo.b3};
        color: ${theme.palette.grey.g70};
      `}

  &:hover {
    ${({ theme, isActive }) =>
      !isActive &&
      `
      background-color: ${theme.palette.grey.g10};
    `}
  }
`;

// ===== 헤더 영역 =====
export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;

  ${mq_lg} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    margin-bottom: 28px;
  }
`;

export const SortContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  ${mq_lg} {
    justify-content: flex-end;
  }
`;

export const SortDropdown = styled.div`
  position: relative;
`;

export const SortButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px 8px 0;
  background-color: ${({ theme }) => theme.palette.grey.w};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g90};

  svg {
    width: 20px;
    height: 20px;
    transition: transform 0.2s ease;
  }

  &[data-open='true'] svg {
    transform: rotate(180deg);
  }
`;

export const SortMenu = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  min-width: 112px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-radius: 6px;
  box-shadow: 0px 8px 14px 0px rgba(139, 139, 139, 0.15);
  overflow: hidden;
  z-index: 10;
`;

export const SortMenuItem = styled.button<{ isActive?: boolean }>`
  display: block;
  width: 100%;
  padding: 7px 12px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme, isActive }) => (isActive ? theme.palette.grey.g90 : theme.palette.grey.g70)};

  &:hover {
    background-color: ${({ theme }) => theme.palette.grey.g00};
  }
`;

// ===== 질문별 응답 카드 =====
export const QuestionCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const QuestionCard = styled.div`
  background-color: ${({ theme }) => theme.palette.grey.w};
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-radius: 10px;
  box-shadow: 0px 8px 14px 0px rgba(139, 139, 139, 0.15);
  overflow: hidden;
`;

export const QuestionCardHeader = styled.div`
  display: flex;
  padding: 20px 30px 20px 22px;
  flex-direction: column;
  gap: 4px;

  ${mq_lg} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 24px 26px;
    gap: 24px;
  }
`;

export const QuestionTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
`;

export const QuestionTitle = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2px;
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g90};
`;

export const RequiredMark = styled.span`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.status.error1};
`;

export const QuestionDescription = styled.p`
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g60};
`;

export const AnswerCount = styled.span`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g40};
  white-space: nowrap;
`;

export const QuestionCardBody = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.palette.grey.g00};
  border-radius: 8px;
  margin: 0 12px 12px 12px;
  max-height: 454px;
  overflow-y: auto;
  box-shadow: 0px -7px 10px 0px rgba(0, 0, 0, 0.02);

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.palette.grey.g40};
    border-radius: 13px;
    opacity: 0.3;
  }
`;

export const AnswerList = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 454px;
`;

export const AnswerItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g10};

  &:last-child {
    border-bottom: none;
  }

  ${mq_lg} {
    flex-direction: row;
    padding: 20px 24px;
  }
`;

export const AnswerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 4px;
`;

export const AnswerText = styled.p`
  flex: 1;
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};
  word-break: break-word;
`;

export const AnswerTime = styled.span`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g40};
  white-space: nowrap;
`;

export const AnswerMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g40};
`;

export const MetaSeparator = styled.span`
  color: ${({ theme }) => theme.palette.grey.g40};
`;

export const EmptyAnswer = styled.div`
  padding: 20px 24px;
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g40};
`;

// ===== 참여자별 응답 =====
export const ParticipantContainer = styled.div`
  display: flex;
  min-height: 500px;
  border: none;
  border-radius: 10px;

  ${mq_lg} {
    border: 1px solid ${({ theme }) => theme.palette.grey.g20};
    flex-direction: row;
  }
`;

export const ParticipantListSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.grey.w};
  overflow: hidden;

  ${mq_lg} {
    padding: 20px;
    box-shadow: 0px 8px 14px 0px rgba(139, 139, 139, 0.15);
    border-radius: 10px 0 0 10px;
    border-right: 1px solid ${({ theme }) => theme.palette.grey.g20};
    width: 340px;
  }
`;

export const ParticipantSearchContainer = styled.div`
  margin-bottom: 16px;
`;

export const ParticipantSearchInput = styled.div`
  position: relative;

  input {
    width: 100%;
    padding: 8px 12px 8px 16px;

    border: 1px solid ${({ theme }) => theme.palette.grey.g20};
    border-radius: 100px;
    ${({ theme }) => theme.typo.b2};
    color: ${({ theme }) => theme.palette.grey.g90};
    background-color: ${({ theme }) => theme.palette.grey.w};

    &::placeholder {
      color: ${({ theme }) => theme.palette.grey.g30};
    }

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.palette.primary.o1};
    }
  }
`;

export const ParticipantSearchInputButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: absolute;
  top: 8px;
  right: 12px;
`;

export const ResetButton = styled.button`
  background: ${({ theme }) => theme.palette.grey.g90};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    width: 16px;
    height: 16px;
    color: ${({ theme }) => theme.palette.grey.w};
  }
`;

export const SearchButton = styled.button`
  width: 24px;
  height: 24px;

  svg {
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.palette.grey.g90};
  }
`;

export const ParticipantList = styled.div`
  max-height: 400px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ParticipantItem = styled.div<{ isSelected?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 16px 20px 20px;
  cursor: pointer;
  border: 1px solid
    ${({ theme, isSelected }) => (isSelected ? theme.palette.grey.g40 : theme.palette.grey.g20)};
  border-radius: 10px;
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.palette.grey.g00 : theme.palette.grey.w};

  &:hover {
    background-color: ${({ theme }) => theme.palette.grey.g00};
  }
`;

export const ParticipantInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ParticipantName = styled.span<{ isSelected?: boolean }>`
  ${({ theme, isSelected }) => (isSelected ? theme.typo.sh1 : theme.typo.b2)};
  color: ${({ theme }) => theme.palette.grey.g90};
`;

export const ParticipantMeta = styled.span`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g40};
`;

export const ParticipantArrow = styled.div`
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.palette.grey.g90};
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 8px;
  border-top: 1px solid ${({ theme }) => theme.palette.grey.g10};
`;

export const PaginationButton = styled.button<{ isActive?: boolean }>`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  ${({ theme }) => theme.typo.c1};

  ${({ theme, isActive }) =>
    isActive
      ? `
        background-color: ${theme.palette.grey.g90};
        color: ${theme.palette.grey.w};
      `
      : `
        background-color: transparent;
        color: ${theme.palette.grey.g70};

        &:hover {
          background-color: ${theme.palette.grey.g10};
        }
      `}

  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.palette.grey.g30};
  }
`;

// ===== 참여자 상세 =====
export const ParticipantDetailSection = styled.div`
  display: none;

  ${mq_lg} {
    display: block;
    flex: 1;
    background-color: ${({ theme }) => theme.palette.grey.w};
    border-radius: 0 10px 10px 0;
    box-shadow: 0px 8px 14px 0px rgba(139, 139, 139, 0.15);
    overflow: hidden;
    height: 670px;
  }
`;

export const ParticipantDetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g10};
`;

export const ParticipantDetailTitle = styled.h3`
  ${({ theme }) => theme.typo.sh1};
  font-weight: 400;
  color: ${({ theme }) => theme.palette.grey.g90};
`;

export const ParticipantDetailTimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ParticipantDetailTime = styled.div`
  display: flex;
  gap: 8px;
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g40};

  span {
    color: ${({ theme }) => theme.palette.grey.g60};
  }
`;

export const ParticipantDetailBody = styled.div<{ isEmpty?: boolean }>`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: ${({ theme }) => theme.palette.grey.g00};
  height: inherit;

  ${({ isEmpty }) =>
    isEmpty &&
    `
    flex: 1;
    align-items: center;
    justify-content: center;
  `}
`;

export const ParticipantAnswerCard = styled.div`
  background-color: ${({ theme }) => theme.palette.grey.w};
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-radius: 10px;
  overflow: hidden;
  padding: 0 24px 12px 12px;
`;

export const ParticipantAnswerHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2px;
  padding: 24px 14px;
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g90};
`;

export const ParticipantAnswerContent = styled.div<{ isEmpty?: boolean }>`
  padding: 20px 24px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.grey.g00};
  ${({ theme }) => theme.typo.sh1};
  font-weight: 400;
  color: ${({ theme, isEmpty }) => (isEmpty ? theme.palette.grey.g40 : theme.palette.grey.g90)};
  word-break: break-word;
`;

export const NoSelectionMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 400px;
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g40};
`;

// ===== 검색 결과 없음 =====
export const SearchEmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 0;
  gap: 18px;
  padding: 60px 20px 40px;

  ${mq_lg} {
    flex: 1;
    padding: 20px;
  }
`;

export const SearchEmptyIcon = styled.div`
  width: 48px;
  height: 48px;

  ${mq_lg} {
    width: 60px;
    height: 60px;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const SearchEmptyText = styled.div`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g60};
  text-align: center;
  line-height: 24px;

  ${mq_lg} {
    ${({ theme }) => theme.typo.b4};
    color: ${({ theme }) => theme.palette.grey.g40};
    line-height: 26px;
  }
`;

export const SearchResetButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  border: 1px solid ${({ theme }) => theme.palette.grey.g90};
  border-radius: 4px;
  cursor: pointer;
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g90};

  ${mq_lg} {
    display: flex;
  }

  &:hover {
    background-color: ${({ theme }) => theme.palette.grey.g00};
  }
`;

export const Highlight = styled.mark`
  background-color: ${({ theme }) => theme.palette.primary.o0};
  color: inherit;
  padding: 0;
`;

// ===== 모바일 BottomSheet =====
export const MobileBottomSheetOverlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 999;
  align-items: flex-end;

  ${mq_lg} {
    display: none;
  }
`;

export const MobileBottomSheet = styled.div`
  position: relative;
  width: 100%;
  max-height: 85vh;
  background-color: ${({ theme }) => theme.palette.grey.w};
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const MobileBottomSheetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px 24px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  flex-shrink: 0;
`;

export const MobileBottomSheetHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const MobileBottomSheetTitle = styled.h3`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g70};
`;

export const MobileBottomSheetTimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.typo.b1};
`;

export const MobileBottomSheetTime = styled.div`
  display: flex;
  gap: 8px;
  color: ${({ theme }) => theme.palette.grey.g40};

  span {
    color: ${({ theme }) => theme.palette.grey.g60};
  }
`;

export const MobileBottomSheetCloseButton = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  flex-shrink: 0;

  svg {
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.palette.grey.g70};
  }
`;

export const MobileBottomSheetBody = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 8px 20px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const MobileAnswerCard = styled.div`
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.palette.grey.w};
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-radius: 10px;
  box-shadow: 0px 8px 14px 0px rgba(139, 139, 139, 0.15);
  overflow: hidden;
  padding: 0 20px 12px 12px;
`;

export const MobileAnswerCardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 20px 10px;
`;

export const MobileAnswerCardTitle = styled.div`
  display: flex;
  gap: 2px;
  align-items: flex-start;
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g90};
`;

export const MobileAnswerCardDescription = styled.p`
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g60};
`;

export const MobileAnswerCardContent = styled.div<{ isEmpty?: boolean }>`
  padding: 20px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.grey.g00};
  box-shadow: 0px -7px 10px 0px rgba(0, 0, 0, 0.02);
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme, isEmpty }) => (isEmpty ? theme.palette.grey.g40 : theme.palette.grey.g90)};
  word-break: break-word;
`;

export default {
  Container,
  EmptyContainer,
  EmptyIcon,
  EmptyText,
  SegmentButtonContainer,
  SegmentButton,
  HeaderContainer,
  SortContainer,
  SortDropdown,
  SortButton,
  SortMenu,
  SortMenuItem,
  QuestionCardList,
  QuestionCard,
  QuestionCardHeader,
  QuestionTitleWrapper,
  QuestionTitle,
  RequiredMark,
  QuestionDescription,
  AnswerCount,
  QuestionCardBody,
  AnswerList,
  AnswerItem,
  AnswerContent,
  AnswerText,
  AnswerTime,
  AnswerMeta,
  MetaSeparator,
  EmptyAnswer,
  ParticipantContainer,
  ParticipantListSection,
  ParticipantSearchContainer,
  ParticipantSearchInput,
  ParticipantSearchInputButtonGroup,
  ResetButton,
  SearchButton,
  ParticipantList,
  ParticipantItem,
  ParticipantInfo,
  ParticipantName,
  ParticipantMeta,
  ParticipantArrow,
  PaginationContainer,
  PaginationButton,
  ParticipantDetailSection,
  ParticipantDetailHeader,
  ParticipantDetailTitle,
  ParticipantDetailTimeWrapper,
  ParticipantDetailTime,
  ParticipantDetailBody,
  ParticipantAnswerCard,
  ParticipantAnswerHeader,
  ParticipantAnswerContent,
  NoSelectionMessage,
  SearchEmptyContainer,
  SearchEmptyIcon,
  SearchEmptyText,
  SearchResetButton,
  Highlight,
  MobileBottomSheetOverlay,
  MobileBottomSheet,
  MobileBottomSheetHeader,
  MobileBottomSheetHeaderContent,
  MobileBottomSheetTitle,
  MobileBottomSheetTimeWrapper,
  MobileBottomSheetTime,
  MobileBottomSheetCloseButton,
  MobileBottomSheetBody,
  MobileAnswerCard,
  MobileAnswerCardHeader,
  MobileAnswerCardTitle,
  MobileAnswerCardDescription,
  MobileAnswerCardContent,
};
