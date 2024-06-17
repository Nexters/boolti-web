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
  const { data: userAccountInfoData, isLoading: isUserAccountInfoLoading } = useUserSummary();

  const [isLogin] = useState(Boolean(getIsLogin()));
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
                <TextButton
                  colorTheme="netural"
                  size="regular"
                  onClick={() => {
                    /** noop */
                  }}
                >
                  공연 준비하기
                </TextButton>
              </>
            }
            right={
              isLogin ? (
                <ProfileDropdown
                  userProfile={userAccountInfoData}
                  isLoading={isUserAccountInfoLoading}
                />
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
