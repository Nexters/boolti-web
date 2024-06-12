import { LOCAL_STORAGE } from '@boolti/api';
import { BooltiGrey, BooltiLogo } from '@boolti/icon';
import { Footer, TextButton } from '@boolti/ui';
import { useTheme } from '@emotion/react';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '~/components/Header';
import Layout from '~/components/Layout';
import ProfileDropdown from '~/components/ProfileDropdown';
import { PATH } from '~/constants/routes';

import Styled from './QRPage.styles';

const QRPage = () => {
  const theme = useTheme();
  // TODO: 다이나믹 링크값 변경
  const dynamicLink = `https://boolti.page.link/?link=https://preview.boolti.in/show/&apn=com.nexters.boolti&ibi=com.nexters.boolti&isi=6476589322`;
  const [isLogin, setIsLogin] = useState(
    Boolean(
      window.localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN) &&
        window.localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN),
    ),
  );
  const navigate = useNavigate();

  return (
    <Styled.QRCodePage>
      <Layout
        layoutStyle={{
          backgroundColor: theme.palette.grey.g00,
        }}
        headerContainerStyle={{
          backgroundColor: theme.palette.mobile.grey.g05,
          borderColor: theme.palette.grey.g20,
        }}
        header={
          <Header
            left={
              <>
                <Styled.Logo>
                  <BooltiLogo />
                </Styled.Logo>
                {/* TODO: 공연 준비하기 페이지로 이동 */}
                <TextButton colorTheme="netural" size="regular" onClick={() => {}}>
                  공연 준비하기
                </TextButton>
              </>
            }
            right={
              isLogin ? (
                <ProfileDropdown />
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
              <QRCodeSVG value={dynamicLink} size={182} level="L" />
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
