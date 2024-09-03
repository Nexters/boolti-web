import styled from '@emotion/styled';

interface SummaryProps {
  flex?: number;
}

interface SummaryTextProps {
  big?: boolean;
}

const SummaryContainer = styled.div`
  margin-top: 56px;
  padding: 16px 20px;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.palette.grey.g00};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const SummaryRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  & + & {
    margin-top: 16px;
  }
`;

const Summary = styled.div<SummaryProps>`
  flex: ${({ flex }) => flex ?? 1};
  display: flex;
  align-items: center;
  ${({ theme }) => theme.typo.b1};
  border-right: 1px solid ${({ theme }) => theme.palette.grey.g30};
  margin-right: 40px;

  &:nth-of-type(3) {
    margin-right: 0;
  }

  &:last-child {
    border-right: none;
  }
`;

const SummaryLabel = styled.p<SummaryTextProps>`
  ${({ big, theme }) => (big ? theme.typo.b2 : theme.typo.b1)}
  color: ${({ theme }) => theme.palette.grey.g60};
  padding-right: 20px;
`;

const SummaryValue = styled.p<SummaryTextProps>`
  ${({ big, theme }) => (big ? theme.typo.sh1 : theme.typo.b1)}
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

const PaymentSummaryButton = styled.button<{ isSelected?: boolean }>`
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
  SummaryContainer,
  SummaryRow,
  Summary,
  SummaryLabel,
  SummaryValue,
  Filter,
  FilterCol,
  SummaryButtonContainer,
  PaymentSummaryButton,
};
