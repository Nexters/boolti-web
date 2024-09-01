import styled from '@emotion/styled';

const EntranceCode = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 24px;
  ${({ theme }) => theme.typo.sh2};
  color: ${({ theme }) => theme.palette.grey.g90};
  background-color: ${({ theme }) => theme.palette.grey.w};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  box-shadow: 0px 8px 14px 0px #888d9d26;
  margin-top: 56px;
`;

const SummaryContainer = styled.div`
  margin-top: 20px;
  padding: 16px 20px;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.palette.grey.g00};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Summary = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${({ theme }) => theme.typo.b1};
  border-right: 1px solid ${({ theme }) => theme.palette.grey.g30};
  margin-right: 40px;

  &:last-child {
    margin-right: 0;
    border-right: none;
  }
`;

const SummaryLabel = styled.p`
  color: ${({ theme }) => theme.palette.grey.g60};
  padding-right: 20px;
`;

const SummaryValue = styled.p`
  color: ${({ theme }) => theme.palette.grey.g90};
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 52px;
`;

const FilterCol = styled.div`
  display: flex;
  align-items: center;
`;

const SummaryButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EntranceSummaryButton = styled.button<{ isSelected?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ isSelected }) => (isSelected ? 'unset' : 'pointer')};
  ${({ theme, isSelected }) => (isSelected ? theme.typo.sh1 : theme.typo.b3)};
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.palette.grey.g90 : theme.palette.grey.g70};
  margin-right: 16px;
  padding: 8px 4px;
  &:last-of-type {
    margin-right: auto;
  }

  & > span {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0 6px;
    border-radius: 30px;
    margin-left: 4px;
    ${({ theme }) => theme.typo.c1};
    color: ${({ theme }) => theme.palette.grey.w};
    background-color: ${({ theme, isSelected }) =>
      isSelected ? theme.palette.grey.g90 : theme.palette.grey.g50};
  }
`;
export default {
  EntranceCode,
  SummaryContainer,
  Summary,
  SummaryLabel,
  SummaryValue,
  Filter,
  FilterCol,
  SummaryButtonContainer,
  EntranceSummaryButton,
};
