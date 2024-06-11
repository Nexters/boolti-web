import { BooltiDark } from '@boolti/icon';
import { Footer } from '@boolti/ui';

import qrCodeImage from '~/assets/images/qr-code-img.png';

import Styled from './QRPage.styles';

const QRPage = () => {
  return (
    <Styled.QRCodePage>
      <Styled.Layout>
        <Styled.QRCodeContainer>
          <Styled.QRCodeTitleText>불티 앱에서 핫한 공연을 예매하세요!</Styled.QRCodeTitleText>
          <Styled.QRCodeDescriptionText>
            휴대폰 카메라로 QR코드를 찍어 앱을 다운로드 받아요
          </Styled.QRCodeDescriptionText>
          <Styled.QRCodeImageWrapper>
            <Styled.QRCodeImage src={qrCodeImage} alt="App QR Code" />
            <BooltiDark />
          </Styled.QRCodeImageWrapper>
        </Styled.QRCodeContainer>
        <Footer />
      </Styled.Layout>
    </Styled.QRCodePage>
  );
};

export default QRPage;
