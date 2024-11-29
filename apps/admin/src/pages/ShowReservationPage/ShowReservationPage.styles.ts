import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

const Container = styled.div`
  padding: 0 20px;
  margin: 20px 0 32px;

  ${mq_lg} {
    margin: 40px 0 68px;
  }
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0;

  ${mq_lg} {
    padding: 100px 0;
  }
`;

const EmptyTitle = styled.p`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g60};
  margin-top: 16px;
  text-align: center;
  width: 200px;
  white-space: pre-wrap;

  ${mq_lg} {
    width: auto;
    ${({ theme }) => theme.typo.b4};
  }
`;

const TicketSummaryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;
  ${mq_lg} {
    gap: 12px;
    margin-bottom: 40px;
  }
`;

const TicketSummary = styled.div<{ colorTheme: 'grey' | 'red' }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  flex: 1 0 auto;
  border-radius: 8px;
  width: 100%;
  ${({ colorTheme, theme }) => {
    switch (colorTheme) {
      case 'grey':
        return `
          background-color: ${theme.palette.grey.g00};
          color: ${theme.palette.grey.g60};
          & > b {
            color: ${theme.palette.grey.g90};
          }
        `;
      case 'red':
        return `
          background-color: ${theme.palette.primary.o0};
          color: ${theme.palette.primary.o2};
        `;
    }
  }}
  ${mq_lg} {
    flex: 1 0 0;
    min-width: 230px;
    align-items: center;
  }
`;

const TicketSumamryLabel = styled.span`
  ${({ theme }) => theme.typo.b1};
  margin-bottom: 4px;
  ${mq_lg} {
    margin-bottom: 0;
    ${({ theme }) => theme.typo.b2};
  }
`;

const TicketSumamryValue = styled.b`
  ${({ theme }) => theme.typo.sh2};
`;

const TicketReservationSummaryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;
  ${mq_lg} {
    width: auto;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mq_lg} {
    width: auto;
  }
`;

const TicketReservationSummaryButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TicketReservationSummaryButton = styled.button<{ isSelected?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ isSelected }) => (isSelected ? 'unset' : 'pointer')};
  ${({ theme, isSelected }) => (isSelected ? theme.typo.sh1 : theme.typo.b3)};
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.palette.grey.g90 : theme.palette.grey.g70};
  margin-right: 16px;
  padding: 8px 4px;

  &:first-of-type {
    padding-left: 0;
  }

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

const InputContainer = styled.div`
  position: relative;
  margin-left: 8px;
  flex-shrink: 1;
`;

const Input = styled.input`
  display: flex;
  width: 180px;
  max-width: 262px;
  padding: 8px 32px 8px 16px;
  justify-content: space-between;
  align-items: center;
  border-radius: 100px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  background-color: ${({ theme }) => theme.palette.grey.w};
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g90};
  transition: border-color 0.2s ease-in-out;
  &:focus {
    border-color: ${({ theme }) => theme.palette.primary.o1};
  }
  &:placeholder-shown {
    color: ${({ theme }) => theme.palette.grey.g30};
  }

  ${mq_lg} {
    width: 100%;
    padding: 8px 72px 8px 16px;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
`;

const InputButton = styled.button`
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TableContainer = styled.div`
  display: none;
  ${mq_lg} {
    display: block;
    width: 100%;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export default {
  Container,
  TicketSummaryContainer,
  TicketSummary,
  TicketSumamryLabel,
  TicketSumamryValue,
  TicketReservationSummaryContainer,
  TicketReservationSummaryButtonContainer,
  TicketReservationSummaryButton,
  InputContainer,
  TableContainer,
  Input,
  InputButton,
  ButtonContainer,
  FilterContainer,
  EmptyContainer,
  EmptyTitle,
};
