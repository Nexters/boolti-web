import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0;

  ${mq_lg} {
    padding: 100px 0;
  }
`;

const Title = styled.p`
  margin-top: 16px;
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g60};
  text-align: center;
  width: 200px;
  white-space: pre-wrap;

  ${mq_lg} {
    width: auto;
    white-space: normal;
    ${({ theme }) => theme.typo.b4};
  }
`;

const DescriptionBox = styled.div`
  padding: 20px 24px;
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
  background-color: ${({ theme }) => theme.palette.grey.g00};
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-radius: 4px;
  text-align: center;
  margin: 32px 0 0 0;
  width: calc(100% - 40px);
  white-space: pre;

  strong {
    ${({ theme }) => theme.typo.sh0};
    color: ${({ theme }) => theme.palette.grey.g90};
  }

  ${mq_lg} {
    margin: 40px 0 0 0;
    width: 600px;
  }
`;

export default {
  Container,
  Title,
  DescriptionBox,
};
