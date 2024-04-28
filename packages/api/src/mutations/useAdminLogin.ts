import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

interface PostAdminLoginRequest {
  id: string;
  pw: string;
}

interface PostAdminLoginResponse {
  accessToken: string;
  refreshToken: string;
}

const postAdminLogin = ({ id, pw }: PostAdminLoginRequest) =>
  fetcher.post<PostAdminLoginResponse>('sa-api/papi/v1/login/id-pw', {
    json: { id, pw },
  });

const useAdmingLogin = () =>
  useMutation(({ id, pw }: PostAdminLoginRequest) => postAdminLogin({ id, pw }));

export default useAdmingLogin;
