import { useKakaoLogin, useKakaoToken, useKakaoUserInfo, useSignUp } from '@boolti/api';
import { useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LOCAL_STORAGE from '../../constants/localStorage';
import { PATH } from '../../constants/routes';

const OAuthKakaoPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const code = useMemo(() => new URLSearchParams(location.search).get('code'), [location.search]);

  const kakaoTokenMutation = useKakaoToken();
  const kakaoUserInfoMutation = useKakaoUserInfo();
  const kakaoLoginMutation = useKakaoLogin();
  const signUpMutation = useSignUp();

  const kakaoSignUp = useCallback(
    async ({ kakaoAccessToken }: { kakaoAccessToken: string }) => {
      const userInfo = await kakaoUserInfoMutation.mutateAsync({
        accessToken: kakaoAccessToken,
        secureResource: true,
        propertyKeys: [
          'kakao_account.profile',
          'kakao_account.name',
          'kakao_account.email',
          'kakao_account.age_range',
          'kakao_account.birthday',
          'kakao_account.gender',
        ],
      });

      const { accessToken, refreshToken } = await signUpMutation.mutateAsync({
        nickname: userInfo.kakao_account?.profile?.nickname,
        email: userInfo.kakao_account?.email,
        phoneNumber: userInfo.kakao_account?.phone_number,
        oauthType: 'KAKAO',
        oauthIdentity: `${userInfo.id}`,
        imgPath: userInfo.kakao_account?.profile?.profile_image_url,
      });

      window.localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, accessToken);
      window.localStorage.setItem(LOCAL_STORAGE.REFRESH_TOKEN, refreshToken);

      navigate(PATH.SIGNUP_COMPLETE, { replace: true });
    },
    [kakaoUserInfoMutation, navigate, signUpMutation],
  );

  const kakaoLogin = useCallback(async () => {
    if (!code) return;

    const { access_token: kakaoAccessToken } = await kakaoTokenMutation.mutateAsync({ code });
    const { accessToken, refreshToken, signUpRequired } = await kakaoLoginMutation.mutateAsync({
      accessToken: kakaoAccessToken,
    });

    if (signUpRequired) {
      await kakaoSignUp({ kakaoAccessToken });

      return;
    }

    window.localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, accessToken);
    window.localStorage.setItem(LOCAL_STORAGE.REFRESH_TOKEN, refreshToken);

    navigate(PATH.HOME);
  }, [code, kakaoLoginMutation, kakaoSignUp, kakaoTokenMutation, navigate]);

  useEffect(() => {
    kakaoLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default OAuthKakaoPage;
