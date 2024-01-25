import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const LoginPage = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.grey.g20};
`;

const LoginContent = styled.div``;

const Card = styled.div`
  width: 600px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  box-shadow: 0px 8px 14px 0px #8b8b8b26;
  margin-bottom: 40px;
  border-radius: 8px;
`;

const CardHeader = styled.div`
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g20};
`;

const CardHeaderTitle = styled.h2`
  ${({ theme }) => theme.typo.h2_m};
  color: ${({ theme }) => theme.palette.grey.g70};
`;

const CardContent = styled.div`
  padding-top: 60px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardContentTitle = styled.h3`
  ${({ theme }) => theme.typo.h3};
  color: ${({ theme }) => theme.palette.grey.g90};
  text-align: center;
  margin-bottom: 48px;
`;

const LoginButtonContainer = styled.div`
  width: 388px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 80px;
`;

const LoginButtonIcon = styled.div`
  position: absolute;
  left: 24px;
  display: inline-flex;
  align-items: center;
`;

const KakaoLoginButton = styled.button`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g100};
  background-color: #ffe833;
  height: 48px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

const AppleLoginButton = styled.button`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.w};
  background-color: ${({ theme }) => theme.palette.grey.g100};
  height: 48px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

const BottomLinkContainer = styled.div`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g70};
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;
`;

const BottomLink = styled(Link)`
  cursor: pointer;
`;

export default {
  LoginPage,
  LoginContent,
  Card,
  CardHeader,
  CardHeaderTitle,
  CardContent,
  CardContentTitle,
  LoginButtonContainer,
  LoginButtonIcon,
  KakaoLoginButton,
  AppleLoginButton,
  BottomLinkContainer,
  BottomLink,
};
