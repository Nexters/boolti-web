import { Button, mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

interface SubTabItemProps {
  active?: boolean;
  isDisabled?: boolean;
}

const ShowPreQuestionPage = styled.div`
  padding: 0 20px;
  margin: 20px 0 32px;

  ${mq_lg} {
    margin: 40px 0 68px;
  }
`;

const SubTabContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const SubTabItem = styled.button<SubTabItemProps>`
  background: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 1;
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  ${({ theme, active }) => (active ? theme.typo.sh1 : theme.typo.b3)};
  color: ${({ active, isDisabled, theme }) => {
    if (active) return theme.palette.grey.g90;
    if (isDisabled) return theme.palette.grey.g70;
    return theme.palette.grey.g70;
  }};

  &:hover {
    color: ${({ isDisabled, theme }) => (isDisabled ? theme.palette.grey.g70 : theme.palette.grey.g90)};
  }
`;

const Badge = styled.span<{ isDisabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 10px;
  background-color: ${({ isDisabled, theme }) =>
    isDisabled ? theme.palette.grey.g50 : theme.palette.grey.g90};
  color: ${({ theme }) => theme.palette.grey.w};
  ${({ theme }) => theme.typo.c1};
`;

const Content = styled.div<{ fullWidth?: boolean }>`
  max-width: ${({ fullWidth }) => (fullWidth ? 'none' : '600px')};
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const QuestionItem = styled.div`
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  overflow: hidden;
`;

const QuestionRow = styled.div`
  margin-bottom: 16px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const QuestionLabel = styled.label<{ required?: boolean }>`
  display: block;
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-bottom: 8px;

  &::after {
    content: '*';
    color: ${({ theme }) => theme.palette.status.error1};
    display: ${({ required }) => (required ? 'inline' : 'none')};
    margin-left: 2px;
  }
`;

const TextArea = styled.textarea<{ hasError?: boolean; disabled?: boolean }>`
  width: 100%;
  min-height: 48px;
  max-height: 200px;
  padding: 12px;
  border: 1px solid
    ${({ theme, hasError, disabled }) =>
      disabled ? 'transparent' : hasError ? theme.palette.status.error1 : theme.palette.grey.g20};
  border-radius: 4px;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.palette.grey.g00 : theme.palette.grey.w};
  color: ${({ theme, disabled }) => (disabled ? theme.palette.grey.g50 : theme.palette.grey.g90)};
  ${({ theme }) => theme.typo.b3};
  resize: none;
  box-sizing: border-box;

  &::placeholder {
    color: ${({ theme }) => theme.palette.grey.g30};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme, hasError, disabled }) =>
      disabled ? 'transparent' : hasError ? theme.palette.status.error1 : theme.palette.grey.g90};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  margin-top: 4px;
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.status.error1};
`;

const QuestionFooter = styled.div<{ showDeleteButton?: boolean }>`
  display: flex;
  justify-content: ${({ showDeleteButton }) => (showDeleteButton ? 'space-between' : 'flex-end')};
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
`;

const DeleteButton = styled.button`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g70};
  text-decoration: underline;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;

  &:hover {
    color: ${({ theme }) => theme.palette.grey.g90};
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ToggleLabel = styled.span`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g70};
`;

const ToggleSwitch = styled.button<{ isOn: boolean; disabled?: boolean }>`
  position: relative;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  background-color: ${({ theme, isOn, disabled }) =>
    disabled ? theme.palette.grey.g40 : isOn ? theme.palette.primary.o1 : theme.palette.grey.g20};
  transition: background-color 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${({ isOn }) => (isOn ? '22px' : '2px')};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.palette.grey.w};
    transition: left 0.2s ease;
  }
`;

const EmptyState = styled.div<{ questionsLength?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  border: ${({ questionsLength }) => (questionsLength === 0 ? '1px dashed' : 'none')}
    ${({ theme }) => theme.palette.grey.g20};
  border-radius: 8px;
  cursor: pointer;
  min-height: ${({ questionsLength }) => (questionsLength === 0 ? '120px' : 'auto')};

  &:hover {
    background-color: ${({ theme }) => theme.palette.grey.g00};
  }
`;

const EmptyStateDisabled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  border: 1px dashed ${({ theme }) => theme.palette.grey.g20};
  border-radius: 8px;
  text-align: center;
`;

const EmptyStateTitle = styled.p`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g50};
  margin-bottom: 8px;
`;

const EmptyStateDescription = styled.p`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g40};
`;

const AddButtonText = styled.span<{ questionsLength?: number }>`
  ${({ theme }) => theme.typo.b3};
  color: ${({ questionsLength, theme }) =>
    questionsLength === 0 ? theme.palette.grey.g40 : theme.palette.grey.g90};
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    width: 20px;
    height: 20px;
  }

  path {
    stroke: ${({ questionsLength, theme }) =>
      questionsLength === 0 ? theme.palette.grey.g40 : theme.palette.grey.g90};
  }
`;

const ResponseEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  text-align: center;
`;

const ResponseEmptyStateText = styled.p`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g50};
`;

const FormFooter = styled.div`
  margin-top: 32px;
`;

const SaveButton = styled.button<{ disabled?: boolean }>`
  padding: 13px 28px;
  border-radius: 4px;
  border: none;
  ${({ theme }) => theme.typo.sh1};
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.palette.grey.g20 : theme.palette.primary.o1};
  color: ${({ theme, disabled }) => (disabled ? theme.palette.grey.g40 : theme.palette.grey.w)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${({ theme, disabled }) =>
      disabled ? theme.palette.grey.g20 : theme.palette.primary.o2};
  }
`;

const HelpText = styled.p`
  margin-top: 16px;
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g50};
`;

// 응답 확인 탭 스타일
const ResponseContainer = styled.div`
  width: 100%;
`;

const ResponseFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;

  ${mq_lg} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const ResponseFilterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ResponseFilterRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FilterSelect = styled.select`
  padding: 8px 32px 8px 12px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g90};
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 7.5L10 12.5L15 7.5' stroke='%23595D6D' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.palette.grey.g90};
  }
`;

const SearchInputContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 262px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 72px 8px 16px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-radius: 100px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g90};

  &::placeholder {
    color: ${({ theme }) => theme.palette.grey.g30};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.palette.primary.o1};
  }
`;

const SearchButtonContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 4px;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
`;

const SearchButton = styled.button`
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  padding: 0;
`;

const ExcelButton = styled(Button)`
  display: none;

  ${mq_lg} {
    display: inline-flex;
  }
`;

const TableContainer = styled.div`
  display: none;

  ${mq_lg} {
    display: block;
    width: 100%;
    overflow-x: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Table = styled.table`
  width: 100%;
  min-width: 800px;
  table-layout: auto;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: ${({ theme }) => theme.palette.grey.g00};
  border-top: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g20};
`;

const TableHeaderRow = styled.tr``;

const TableHeaderCell = styled.th`
  padding: 12px;
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g60};
  text-align: left;
  white-space: nowrap;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g20};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.palette.grey.g00};
  }
`;

const TableCell = styled.td`
  padding: 14px 12px;
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g90};
  white-space: nowrap;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TableEmpty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  text-align: center;
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g50};
`;

const ResetButton = styled(Button)`
  margin-top: 16px;
`;

const AnswerBadge = styled.span<{ answered: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border-radius: 4px;
  ${({ theme }) => theme.typo.c1};
  background-color: ${({ theme, answered }) =>
    answered ? theme.palette.primary.o0 : theme.palette.grey.g10};
  color: ${({ theme, answered }) => (answered ? theme.palette.primary.o1 : theme.palette.grey.g60)};
`;

// 페이지네이션
const Pagination = styled.div`
  display: none;

  ${mq_lg} {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    margin-top: 24px;
  }
`;

const PaginationButton = styled.button<{ disabled?: boolean }>`
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme, disabled }) => (disabled ? theme.palette.grey.g40 : theme.palette.grey.g90)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${({ theme, disabled }) =>
      disabled ? theme.palette.grey.w : theme.palette.grey.g00};
  }
`;

const PaginationInfo = styled.span`
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g70};
`;

// 모바일 카드 리스트
const MobileCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  ${mq_lg} {
    display: none;
  }
`;

const MobileCard = styled.div`
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.palette.grey.g00};
  }
`;

const MobileCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const MobileCardName = styled.span`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g90};
`;

const MobileCardTicket = styled.span`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
`;

const MobileCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MobileCardInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
`;

const MobileCardDate = styled.span`
  ${({ theme }) => theme.typo.c1};
  color: ${({ theme }) => theme.palette.grey.g50};
`;

// Drawer 스타일
const DrawerContent = styled.div`
  padding: 0 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
  overflow-y: auto;
`;

const DrawerSection = styled.div``;

const DrawerSectionTitle = styled.h3`
  ${({ theme }) => theme.typo.sh0};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-bottom: 12px;
`;

const DrawerInfoRow = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 8px 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g10};

  &:last-of-type {
    border-bottom: none;
  }
`;

const DrawerInfoLabel = styled.span`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
  width: 80px;
  flex-shrink: 0;
`;

const DrawerInfoValue = styled.span`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g90};
  flex: 1;
`;

const DrawerAnswerItem = styled.div`
  padding: 16px;
  background-color: ${({ theme }) => theme.palette.grey.g00};
  border-radius: 8px;
  margin-bottom: 12px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const DrawerAnswerQuestion = styled.p`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
  margin-bottom: 8px;
`;

const DrawerAnswerText = styled.p`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};
  white-space: pre-wrap;
`;

const DrawerNoAnswer = styled.p`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g40};
  font-style: italic;
`;

const ResponseCount = styled.span`
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g60};
`;

export default {
  ShowPreQuestionPage,
  SubTabContainer,
  SubTabItem,
  Badge,
  Content,
  QuestionContainer,
  QuestionItem,
  QuestionRow,
  QuestionLabel,
  TextArea,
  ErrorMessage,
  QuestionFooter,
  DeleteButton,
  ToggleContainer,
  ToggleLabel,
  ToggleSwitch,
  EmptyState,
  EmptyStateDisabled,
  EmptyStateTitle,
  EmptyStateDescription,
  AddButtonText,
  ResponseEmptyState,
  ResponseEmptyStateText,
  FormFooter,
  SaveButton,
  HelpText,
  // 응답 확인 탭
  ResponseContainer,
  ResponseFilterContainer,
  ResponseFilterLeft,
  ResponseFilterRight,
  FilterSelect,
  SearchInputContainer,
  SearchInput,
  SearchButtonContainer,
  SearchButton,
  ExcelButton,
  TableContainer,
  Table,
  TableHeader,
  TableHeaderRow,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  TableEmpty,
  ResetButton,
  AnswerBadge,
  // 페이지네이션
  Pagination,
  PaginationButton,
  PaginationInfo,
  // 모바일
  MobileCardList,
  MobileCard,
  MobileCardHeader,
  MobileCardName,
  MobileCardTicket,
  MobileCardContent,
  MobileCardInfo,
  MobileCardDate,
  // Drawer
  DrawerContent,
  DrawerSection,
  DrawerSectionTitle,
  DrawerInfoRow,
  DrawerInfoLabel,
  DrawerInfoValue,
  DrawerAnswerItem,
  DrawerAnswerQuestion,
  DrawerAnswerText,
  DrawerNoAnswer,
  ResponseCount,
};
