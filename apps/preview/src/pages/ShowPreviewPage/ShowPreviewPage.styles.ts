import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

const PREVIEW_MAX_WIDTH = '640px';

const ShowPreviewPage = styled.div`
  background-color: ${({ theme }) => theme.palette.grey.g00};
`;

const ShowPreviewContainer = styled.div`
  position: relative;
  max-width: ${PREVIEW_MAX_WIDTH};
  margin: 0 auto;
  padding-bottom: 76px;
  background-color: ${({ theme }) => theme.palette.mobile.grey.g95};
`;

const FooterWrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.grey.g100};
`;

const ReservationButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: ${PREVIEW_MAX_WIDTH};
  height: 76px;
  padding: 12px 20px 16px;
  background-color: ${({ theme }) => theme.palette.mobile.grey.g95};
  z-index: 99;

  &::before {
    content: '';
    position: absolute;
    bottom: 76px;
    left: 0;
    width: 100%;
    height: 16px;
    background: linear-gradient(180deg, rgba(9, 10, 11, 0) 0%, #090a0b 100%);
  }
`;

const ReservationButton = styled.button`
  width: 100%;
  height: 48px;
  display: none;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.primary.o1};
  color: ${({ theme }) => theme.palette.grey.w};
  ${({ theme }) => theme.typo.sh1};
  cursor: pointer;

  @media (min-width: ${PREVIEW_MAX_WIDTH}) {
    display: flex;
  }
`;

const ReservationButtonMobile = styled.button`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.primary.o1};
  color: ${({ theme }) => theme.palette.grey.w};
  ${({ theme }) => theme.typo.sh1};
  cursor: pointer;

  @media (min-width: ${PREVIEW_MAX_WIDTH}) {
    display: none;
  }
`;

const DialogContainer = styled.div`
  position: relative;
`;

const DialogQRCodeContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.grey.g00};
  width: calc(100% + 48px);
  height: 300px;
  position: relative;
  left: -24px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;

  ${mq_lg} {
    width: calc(100% + 64px);
    left: -32px;
    top: -32px;
    margin-bottom: 0;
  }
`;

const QRCodeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  border-radius: 8px;
`;

const DialogTitle = styled.h2`
  ${({ theme }) => theme.typo.h2};
  color: ${({ theme }) => theme.palette.grey.b};
  text-align: center;
  margin-bottom: 8px;
`;

const DialogDescription = styled.p`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g70};
  text-align: center;
  margin-bottom: 24px;

  ${mq_lg} {
    margin-bottom: 0;
  }
`;

const ShareBottomSheet = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 12px;
  padding-bottom: 28px;
`;

const ShareBottomSheetButton = styled.button`
  display: flex;
  align-items: center;
  height: 58px;
  padding: 0;
  background-color: ${({ theme }) => theme.palette.mobile.grey.g85};
  color: ${({ theme }) => theme.palette.mobile.grey.g10};
`;

export default {
  ShowPreviewPage,
  ShowPreviewContainer,
  FooterWrapper,
  ReservationButtonWrapper,
  ReservationButton,
  ReservationButtonMobile,
  DialogContainer,
  DialogQRCodeContainer,
  QRCodeContainer,
  DialogTitle,
  DialogDescription,
  ShareBottomSheet,
  ShareBottomSheetButton,
};
