import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

interface PostKakaoLoginRequest {
  accessToken: string;
}

interface PostKakaoLoginResponse {
  accessToken: string;
  refreshToken: string;
  signUpRequired: boolean;
}

const postKakaoLogin = ({ accessToken }: PostKakaoLoginRequest) =>
  fetcher.post<PostKakaoLoginResponse>('web/papi/v1/login/kakao', {
    json: { accessToken },
  });

const useKakaoLogin = () =>
  useMutation(({ accessToken }: PostKakaoLoginRequest) => postKakaoLogin({ accessToken }));

export default useKakaoLogin;
