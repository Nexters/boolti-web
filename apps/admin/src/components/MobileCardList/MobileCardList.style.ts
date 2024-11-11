import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

const Container = styled.div<{ isEmpty: boolean }>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  white-space: pre-wrap;
  padding: 0 20px;
  border-radius: 8px;
  margin: 12px 0 24px 0;
  min-height: ${({ isEmpty }) => (isEmpty ? '240px' : 'auto')};
  text-align: center;
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g40};
  box-shadow: 0px 8px 14px 0px ${({ theme }) => theme.palette.shadow};
  ${mq_lg} {
    display: none;
  }
`;

const CardItem = styled.div`
  width: 100%;
  padding: 20px 0;
  &:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g10};
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
  & + & {
    margin-top: 9px;
  }
  & strong {
    background-color: ${({ theme }) => theme.palette.primary.o0};
  }
`;

const DateText = styled.div`
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g50};
`;

const UserInfoText = styled.div`
  width: 100%;
  text-align: left;
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g90};
`;

const TicketDetailTextWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const TicketInfoText = styled.div`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g70};
`;

const TicketPriceText = styled.div<{ type: 'PRICE' | 'CANCELED' | 'NOT_REGISTERED' }>`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme, type }) =>
    type === 'PRICE' ? theme.palette.grey.g90 : theme.palette.grey.g30};
  text-decoration: ${({ type }) => (type === 'CANCELED' ? 'line-through' : undefined)};
`;

const ResetButton = styled.button`
  font-weight: 600;
  text-decoration: underline;
`;

export default {
  Container,
  CardItem,
  Row,
  DateText,
  UserInfoText,
  TicketInfoText,
  ResetButton,
  TicketDetailTextWrap,
  TicketPriceText,
};
