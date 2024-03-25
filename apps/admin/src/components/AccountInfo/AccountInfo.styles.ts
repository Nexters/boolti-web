import { mq } from '@boolti/ui';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.grey.g00};
  padding: 16px 20px;
  margin-top: 20px;

  ${mq} {
    padding: 28px 32px;
    margin-top: 40px;
  }
`;

const Title = styled.p<{ hasAccountInfo?: boolean }>`
  ${({ theme, hasAccountInfo }) => (hasAccountInfo ? theme.typo.b3 : theme.typo.h1)};
  color: ${({ theme, hasAccountInfo }) =>
    hasAccountInfo ? theme.palette.grey.g70 : theme.palette.grey.g90};
  margin-bottom: 2px;
`;

const Description = styled.span`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g70};
  margin-bottom: 20px;

  ${mq} {
    margin-bottom: 24px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;

  ${mq} {
    margin-bottom: 24px;
  }
`;

const AccountText = styled.span`
  ${({ theme }) => theme.typo.h1};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-right: 8px;
  &:last-of-type {
    margin-right: 16px;
  }
`;

export default {
  Container,
  Title,
  Description,
  AccountText,
  InfoContainer,
};
