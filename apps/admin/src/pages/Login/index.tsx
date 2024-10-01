import { useAppleLogin, useSignUp } from '@boolti/api';
import { AppleIcon, BooltiSmallLogo, KakaotalkIcon } from '@boolti/icon';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import { LINK } from '~/constants/link';
import { PATH } from '~/constants/routes';

import Styled from './LoginPage.styles';
import { useAuthAtom } from '~/atoms/useAuthAtom';

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
    AppleID?: {
      auth: {
        signIn: () => Promise<{
          authorization: {
            code: string;
            id_token: string;
            state: string;
          };
          user: {
            email: string;
            name: {
              firstName: string;
              lastName: string;
            };
          };
        }>;
      };
    };
  }
}

const kakaoRedirectUri = `${window.location.origin}${PATH.OAUTH_KAKAO}`;

const LoginPage = () => {
  const { setToken } = useAuthAtom();
  const navigate = useNavigate();

  const appleLoginMutation = useAppleLogin();
  const signUpMutation = useSignUp();

  const appleSignUp = async ({
    nickname,
    email,
    oauthIdentity,
  }: {
    nickname: string;
    email: string;
    oauthIdentity: string;
  }) => {
    const { accessToken, refreshToken } = await signUpMutation.mutateAsync({
      nickname,
      email,
      oauthType: 'APPLE',
      oauthIdentity,
    });

    setToken(accessToken, refreshToken);
    navigate(PATH.SIGNUP_COMPLETE, { replace: true });
  };

  const appleLogin = async () => {
    try {
      const data = await window.AppleID?.auth.signIn();

      if (!data) return;

      const { accessToken, refreshToken, signUpRequired } = await appleLoginMutation.mutateAsync({
        idToken: data.authorization.id_token,
      });

      const sub = jwtDecode(data.authorization.id_token).sub;

      if (signUpRequired && sub) {
        await appleSignUp({
          nickname: `${data.user.name.lastName}${data.user.name.firstName}`,
          email: data.user.email,
          oauthIdentity: sub,
        });

        return;
      }

      setToken(accessToken, refreshToken);
      navigate(PATH.HOME);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickAppleLogin = () => {
    appleLogin();
  };

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
                  window.Kakao?.Auth.authorize({ redirectUri: kakaoRedirectUri });
                }}
              >
                <Styled.LoginButtonIcon>
                  <KakaotalkIcon />
                </Styled.LoginButtonIcon>
                카카오톡으로 시작하기
              </Styled.KakaoLoginButton>
              <Styled.AppleLoginButton onClick={handleClickAppleLogin}>
                <Styled.LoginButtonIcon>
                  <AppleIcon />
                </Styled.LoginButtonIcon>
                Apple로 시작하기
              </Styled.AppleLoginButton>
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
    </Styled.LoginPage>
  );
};

export default LoginPage;
