import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { SuperAdminPasswordChangeRequest } from '../types/superAdminUser';

/** 본인 비밀번호 변경. 성공하면 서버가 모든 기기의 로그인을 끊는다. */
const useSuperAdminChangePassword = () =>
  useMutation({
    mutationFn: (request: SuperAdminPasswordChangeRequest) =>
      fetcher.put<void>('sa-api/v1/super-admin-users/me/password', { json: request }),
  });

export default useSuperAdminChangePassword;
