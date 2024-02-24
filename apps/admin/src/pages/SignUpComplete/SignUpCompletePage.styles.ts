import { mq } from '@boolti/ui';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const SignUpCompletePage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.grey.g20};
`;

const SignUpCompleteContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${mq} {
    width: auto;
    height: auto;
  }
`;

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px 32px 20px;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.grey.w};
  box-shadow: 0px 8px 14px 0px #8b8b8b26;
  border-radius: 8px;

  ${mq} {
    width: 600px;
    padding: 0;
  }
`;

const CardContent = styled.div`
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardContentTitle = styled.h3`
  ${({ theme }) => theme.typo.h2};
  color: ${({ theme }) => theme.palette.grey.g90};
  text-align: center;
  margin-bottom: 4px;
  ${mq} {
    ${({ theme }) => theme.typo.h3};
  }
`;

const CardContentDescription = styled.p`
  text-align: center;
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g70};
  ${mq} {
    margin-bottom: 40px;
    ${({ theme }) => theme.typo.b3};
  }
`;

const CardContentLink = styled(Link)`
  white-space: pre-wrap;
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g70};
  font-weight: 600;
  text-decoration: underline;
  margin-bottom: 40px;
  ${mq} {
    white-space: nowrap;
  }
`;

const StartButton = styled.button`
  position: absolute;
  bottom: 32px;
  width: calc(100% - 40px);
  max-width: 388px;
  height: 48px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: ${({ theme }) => theme.palette.primary.o1};
  color: ${({ theme }) => theme.palette.grey.w};
  border-radius: 4px;
  cursor: pointer;
  ${mq} {
    position: static;
  }
`;

export default {
  SignUpCompletePage,
  SignUpCompleteContent,
  Card,
  CardContent,
  CardContentTitle,
  CardContentDescription,
  CardContentLink,
  StartButton,
};
