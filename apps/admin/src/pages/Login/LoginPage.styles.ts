import { mq } from '@boolti/ui';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const LoginPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.grey.g00};
`;

const LoginContent = styled.div`
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.grey.w};
  box-shadow: 0px 8px 14px 0px #8b8b8b26;
  border-radius: 8px;
  padding: 0 20px 32px 20px;
  ${mq} {
    width: 600px;
    padding: 0;
  }
`;

const CardHeader = styled.div`
  display: none;
  ${mq} {
    width: 100%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g20};
  }
`;

const CardHeaderTitle = styled.h2`
  ${({ theme }) => theme.typo.h2_m};
  color: ${({ theme }) => theme.palette.grey.g70};
`;

const CardContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  ${mq} {
    padding-top: 60px;
    padding-bottom: 40px;
  }
`;

const CardContentTitle = styled.h3`
  ${({ theme }) => theme.typo.h2};
  color: ${({ theme }) => theme.palette.grey.g90};
  text-align: center;
  margin-bottom: 48px;

  ${mq} {
    ${({ theme }) => theme.typo.h3};
  }
`;

const CardContentTitleText = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    height: 21px;
    margin-left: 4px;
  }

  ${mq} {
    svg {
      height: 26px;
      margin-left: 8px;
      margin-right: 2px;
    }
  }
`;

const LoginButtonContainer = styled.div`
  width: 100%;
  max-width: 388px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 0;

  ${mq} {
    margin-bottom: 80px;
    padding: 0 20px;
  }
`;

const LoginButtonIcon = styled.div`
  position: absolute;
  left: 24px;
  display: inline-flex;
  align-items: center;
`;

const KakaoLoginButton = styled.button`
  width: 100%;
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

  ${mq} {
    width: auto;
  }
`;

const AppleLoginButton = styled.button`
  width: 100%;
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

  ${mq} {
    width: auto;
  }
`;

const BottomLinkContainer = styled.div`
  position: absolute;
  bottom: 32px;
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g70};
  text-align: center;

  ${mq} {
    position: static;
  }
`;

const BottomLink = styled(Link)`
  display: block;
  cursor: pointer;
  & + & {
    margin-top: 8px;
  }
`;

export default {
  LoginPage,
  LoginContent,
  Card,
  CardHeader,
  CardHeaderTitle,
  CardContent,
  CardContentTitle,
  CardContentTitleText,
  LoginButtonContainer,
  LoginButtonIcon,
  KakaoLoginButton,
  AppleLoginButton,
  BottomLinkContainer,
  BottomLink,
};
