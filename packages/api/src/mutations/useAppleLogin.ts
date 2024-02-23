import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

interface PostAppleLoginRequest {
  idToken: string;
}

interface PostAppleLoginResponse {
  accessToken: string;
  refreshToken: string;
  signUpRequired: boolean;
}

const postAppleLogin = ({ idToken }: PostAppleLoginRequest) =>
  fetcher.post<PostAppleLoginResponse>('web/papi/v1/login/appleid', {
    json: { idToken },
  });

const useAppleLogin = () =>
  useMutation(({ idToken }: PostAppleLoginRequest) => postAppleLogin({ idToken }));

export default useAppleLogin;
