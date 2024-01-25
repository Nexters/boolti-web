import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const SignUpCompletePage = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.grey.g20};
`;

const SignUpCompleteContent = styled.div``;

const Card = styled.div`
  width: 600px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  box-shadow: 0px 8px 14px 0px #8b8b8b26;
  margin-bottom: 40px;
  border-radius: 8px;
`;

const CardContent = styled.div`
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardContentTitle = styled.h3`
  ${({ theme }) => theme.typo.h3};
  color: ${({ theme }) => theme.palette.grey.g90};
  text-align: center;
  margin-bottom: 4px;
`;

const CardContentDescription = styled.p`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g70};
  margin-bottom: 40px;
`;

const CardContentLink = styled(Link)`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g70};
  font-weight: 600;
  text-decoration: underline;
  margin-bottom: 40px;
`;

const StartButton = styled.button`
  width: 388px;
  height: 48px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.primary.o1};
  color: ${({ theme }) => theme.palette.grey.w};
  border-radius: 4px;
  cursor: pointer;
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
