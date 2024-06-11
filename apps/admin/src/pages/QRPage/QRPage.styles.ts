import { mq } from '@boolti/ui';
import styled from '@emotion/styled';

const QRCodePage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  background-color: ${({ theme }) => theme.palette.grey.g00};
`;

const Logo = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  width: 60px;
  height: 22.7px;

  ${mq} {
    width: 174px;
    height: 44px;
  }
`;

const Layout = styled.div`
  background-color: ${({ theme }) => theme.palette.grey.g00};
`;

const QRCodeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 60px 0 0;
  margin: 40px auto;
  width: 1080px;
  height: 636px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  border: 1px solid transparent;
  border-radius: 8px;
  box-shadow: 0px 0px 20px 0px ${({ theme }) => theme.palette.shadow};
`;

const QRCodeTitleText = styled.h3`
  ${({ theme }) => theme.typo.h3};
  color: ${({ theme }) => theme.palette.grey.b};
  margin-bottom: 12px;
`;

const QRCodeDescriptionText = styled.div`
  ${({ theme }) => theme.typo.b4};
  color: ${({ theme }) => theme.palette.grey.g70};
  margin-bottom: 40px;
`;

const QRCodeImageWrapper = styled.div`
  width: 400px;
  height: 360px;
  background-color: ${({ theme }) => theme.palette.grey.g00};
  border: 1px solid transparent;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
`;

const QRCodeImage = styled.img`
  width: 200px;
  height: 200px;
  margin: 68px 0 20px 0;
  padding: 9px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  border: 1px solid transparent;
  border-radius: 4px;
`;

export default {
  QRCodePage,
  Logo,
  Layout,
  QRCodeContainer,
  QRCodeTitleText,
  QRCodeDescriptionText,
  QRCodeImageWrapper,
  QRCodeImage,
};
