import { AppleIcon, KakaotalkIcon } from '@boolti/icon';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  return (
    <Styled.LoginPage>
      <Styled.LoginContent>
        <Styled.Card>
          <Styled.CardHeader>
            <Styled.CardHeaderTitle>로그인</Styled.CardHeaderTitle>
          </Styled.CardHeader>
          <Styled.CardContent>
            <Styled.CardContentTitle>
              지금 불티에서
              <br />
              티켓을 불티나게 팔아보세요!
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
              <Styled.AppleLoginButton
                onClick={() => {
                  navigate('/signup/complete');
                }}
              >
                <Styled.LoginButtonIcon>
                  <AppleIcon />
                </Styled.LoginButtonIcon>
                Apple로 시작하기
              </Styled.AppleLoginButton>
            </Styled.LoginButtonContainer>
            <Styled.BottomLinkContainer>
              {/* Note: 추후 실제 링크로 교체 */}
              <Styled.BottomLink to="https://naver.com">개인정보 처리방침</Styled.BottomLink>
              <Styled.BottomLink to="https://naver.com">서비스 이용약관</Styled.BottomLink>
            </Styled.BottomLinkContainer>
          </Styled.CardContent>
        </Styled.Card>
        {/* Note: 추후 로고로 교체 */}
        <p style={{ textAlign: 'center' }}>Boolti logo</p>
      </Styled.LoginContent>
    </Styled.LoginPage>
  );
};

export default LoginPage;
