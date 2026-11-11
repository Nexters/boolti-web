import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

interface PostAdminLoginRequest {
  id: string;
  pw: string;
}

interface PostAdminLoginResponse {
  accessToken: string;
  refreshToken: string;
  /** true면 임시 비밀번호로 로그인한 것이라 비밀번호 변경 화면으로 보내야 한다. */
  passwordChangeRequired?: boolean;
}

const postAdminLogin = ({ id, pw }: PostAdminLoginRequest) =>
  fetcher.post<PostAdminLoginResponse>('sa-api/papi/v1/login/id-pw', {
    json: { id, pw },
  });

const useAdmingLogin = () =>
  useMutation(({ id, pw }: PostAdminLoginRequest) => postAdminLogin({ id, pw }));

export default useAdmingLogin;
