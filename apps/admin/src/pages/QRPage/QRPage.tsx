import { useUserSummary } from '@boolti/api';
import { BooltiGrey, BooltiLogo } from '@boolti/icon';
import { Footer, TextButton } from '@boolti/ui';
import { useTheme } from '@emotion/react';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '~/components/Header';
import Layout from '~/components/Layout';
import ProfileDropdown from '~/components/ProfileDropdown';
import { LINK } from '~/constants/link';
import { PATH } from '~/constants/routes';
import { getIsLogin } from '~/utils/auth';

import Styled from './QRPage.styles';

const QRPage = () => {
  const theme = useTheme();
  const [isLogin] = useState(Boolean(getIsLogin()));
  const { data: userAccountInfoData } = useUserSummary({ enabled: isLogin });
  const navigate = useNavigate();

  return (
    <Styled.QRCodePage>
      <Layout
        layoutStyle={{
          backgroundColor: theme.palette.grey.g00,
        }}
        headerContainerStyle={{
          backgroundColor: theme.palette.grey.g00,
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
              isLogin ? (
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
              <QRCodeSVG value={LINK.DYNAMIC_LINK} size={182} level="L" />
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
