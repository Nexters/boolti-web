import styled from '@emotion/styled';
import { mq_lg } from '@boolti/ui';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 0 60px 0;

  ${mq_lg} {
    padding: 0 20px 60px 20px;
  }
`;

const CountText = styled.p`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g50};
  margin: 0 0 8px 0;
  padding: 0 20px;

  ${mq_lg} {
    padding: 0;
  }
`;

const LinkItem = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background-color: ${({ theme }) => theme.palette.mobile.grey.g90};
  border-radius: 10px;
  text-decoration: none;
  cursor: pointer;
  margin: 0 20px;

  ${mq_lg} {
    margin: 0;
  }
`;

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.palette.grey.g40};

  svg {
    width: 100%;
    height: 100%;
  }
`;

const LinkInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.span`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.mobile.grey.g15};
`;

export default {
  Container,
  CountText,
  LinkItem,
  IconWrapper,
  LinkInfo,
  Title,
};
