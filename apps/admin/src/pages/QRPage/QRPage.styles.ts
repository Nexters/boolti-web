import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const QRCodePage = styled.div`
  background-color: ${({ theme }) => theme.palette.grey.g00};
`;

const Logo = styled(Link)`
  width: 74px;
  height: 28px;
  margin-right: 48px;
  cursor: pointer;
`;

const QRCodeContents = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
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

const QRCodeContainer = styled.div`
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

const QRCodeWrapper = styled.div`
  padding: 9px;
  margin: 68px 0 20px 0;
  background-color: ${({ theme }) => theme.palette.grey.w};
  border: 1px solid transparent;
  border-radius: 4px;
`;

export default {
  QRCodePage,
  Logo,
  QRCodeContents,
  QRCodeTitleText,
  QRCodeDescriptionText,
  QRCodeContainer,
  QRCodeWrapper,
};
