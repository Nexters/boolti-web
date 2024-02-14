import { BooltiSmallLogo, KakaotalkIcon } from '@boolti/icon';
import { Footer } from '@boolti/ui';

import { LINK } from '~/constants/link';
import { PATH } from '~/constants/routes';

import Styled from './LoginPage.styles';

declare global {
  interface Window {
    Kakao?: {
      Auth: {
        authorize: (params: {
          redirectUri: string;
          scope?: string;
          throughTalk?: boolean;
          prompt?: string;
          loginHint?: string;
          serviceTerms?: string;
          state?: string;
          nonce?: string;
        }) => void;
      };
    };
  }
}

const redirectUri = `${window.location.origin}${PATH.OAUTH_KAKAO}`;

const LoginPage = () => {
  return (
    <Styled.LoginPage>
      <Styled.LoginContent>
        <Styled.Card>
          <Styled.CardHeader>
            <Styled.CardHeaderTitle>로그인</Styled.CardHeaderTitle>
          </Styled.CardHeader>
          <Styled.CardContent>
            <Styled.CardContentTitle>
              <Styled.CardContentTitleText>
                지금 <BooltiSmallLogo />
                에서
              </Styled.CardContentTitleText>
              <Styled.CardContentTitleText>티켓을 불티나게 팔아보세요!</Styled.CardContentTitleText>
            </Styled.CardContentTitle>
            <Styled.LoginButtonContainer>
              <Styled.KakaoLoginButton
                onClick={() => {
                  window.Kakao?.Auth.authorize({ redirectUri });
                }}
              >
                <Styled.LoginButtonIcon>
                  <KakaotalkIcon />
                </Styled.LoginButtonIcon>
                카카오톡으로 시작하기
              </Styled.KakaoLoginButton>
              {/* <Styled.AppleLoginButton
                onClick={() => {
                  navigate('/signup/complete');
                }}
              >
                <Styled.LoginButtonIcon>
                  <AppleIcon />
                </Styled.LoginButtonIcon>
                Apple로 시작하기
              </Styled.AppleLoginButton> */}
            </Styled.LoginButtonContainer>
            <Styled.BottomLinkContainer>
              <Styled.BottomLink to={LINK.PRIVACY_POLICY} target="_blank">
                개인정보 처리방침
              </Styled.BottomLink>
              <Styled.BottomLink to={LINK.TERMS} target="_blank">
                서비스 이용약관
              </Styled.BottomLink>
            </Styled.BottomLinkContainer>
          </Styled.CardContent>
        </Styled.Card>
      </Styled.LoginContent>
      <Styled.Footer>
        <Footer />
      </Styled.Footer>
    </Styled.LoginPage>
  );
};

export default LoginPage;
