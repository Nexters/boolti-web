import { useUserSummary } from '@boolti/api';
import { BooltiGrey, BooltiLogo } from '@boolti/icon';
import { Footer, TextButton } from '@boolti/ui';
import { useTheme } from '@emotion/react';
import { QRCodeSVG } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

import Header from '~/components/Header';
import Layout from '~/components/Layout';
import ProfileDropdown from '~/components/ProfileDropdown';
import { LINK } from '~/constants/link';
import { PATH } from '~/constants/routes';

import Styled from './QRPage.styles';
import { useAuthAtom } from '~/atoms/useAuthAtom';

const QRPage = () => {
  const { isLogin } = useAuthAtom();
  const theme = useTheme();
  const { data: userAccountInfoData } = useUserSummary({ enabled: isLogin() });
  const navigate = useNavigate();

  return (
    <Styled.QRCodePage>
      <Layout
        layoutStyle={{
          backgroundColor: theme.palette.grey.g00,
        }}
        headerContainerStyle={{
          borderColor: theme.palette.grey.g20,
        }}
        header={
          <Header
            left={
              <>
                <Styled.Logo to={PATH.INDEX}>
                  <BooltiLogo />
                </Styled.Logo>
                <Styled.Button to={PATH.HOME}>공연 준비하기</Styled.Button>
              </>
            }
            right={
              isLogin() ? (
                <ProfileDropdown image={userAccountInfoData?.imagePath} />
              ) : (
                <TextButton
                  colorTheme="netural"
                  size="regular"
                  onClick={() => navigate(PATH.LOGIN)}
                >
                  로그인
                </TextButton>
              )
            }
          />
        }
      >
        <Styled.QRCodeContents>
          <Styled.QRCodeTitleText>불티 앱에서 핫한 공연을 예매하세요!</Styled.QRCodeTitleText>
          <Styled.QRCodeDescriptionText>
            휴대폰 카메라로 QR코드를 찍어 앱을 다운로드 받아요
          </Styled.QRCodeDescriptionText>
          <Styled.QRCodeContainer>
            <Styled.QRCodeWrapper>
              <QRCodeSVG value={LINK.APP_QR} size={182} level="L" />
            </Styled.QRCodeWrapper>
            <BooltiGrey />
          </Styled.QRCodeContainer>
        </Styled.QRCodeContents>
        <Footer />
      </Layout>
    </Styled.QRCodePage>
  );
};

export default QRPage;
