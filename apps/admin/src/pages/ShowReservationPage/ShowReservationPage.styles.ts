import styled from '@emotion/styled';

const Container = styled.div`
  padding: 0 20px;
  margin: 40px 0 68px;
`;

const TicketSummaryContainer = styled.div`
  display: flex;
  margin-bottom: 40px;
`;

const TicketSummary = styled.div<{ colorTheme: 'grey' | 'red' }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 260px;
  padding: 16px 20px;
  border-radius: 8px;
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
  &:not(:last-child) {
    margin-right: 12px;
  }
`;

const TicketSumamryLabel = styled.span`
  ${({ theme }) => theme.typo.b2};
`;

const TicketSumamryValue = styled.b`
  ${({ theme }) => theme.typo.sh2};
`;

export default {
  Container,
  TicketSummaryContainer,
  TicketSummary,
  TicketSumamryLabel,
  TicketSumamryValue,
};
