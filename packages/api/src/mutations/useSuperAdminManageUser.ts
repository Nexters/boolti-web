import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';
import { SuperAdminOperatorRequest } from '../types/superAdminUser';

/**
 * 다른 슈퍼 어드민 계정 관리.
 * - password-reset: 설정된 임시 비밀번호로 초기화하고 다음 로그인 때 변경을 강제한다.
 * - deactivate: 비활성화하고 모든 기기의 로그인을 끊는다.
 * - activate: 다시 로그인할 수 있게 한다. 끊긴 로그인은 복구하지 않는다.
 */
export type SuperAdminManageAction = 'password-reset' | 'deactivate' | 'activate';

interface SuperAdminManageUserRequest extends SuperAdminOperatorRequest {
  userId: number;
  action: SuperAdminManageAction;
}

const useSuperAdminManageUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, action, requesterCurrentPassword }: SuperAdminManageUserRequest) =>
      fetcher.post<void>(`sa-api/v1/super-admin-users/${userId}/${action}`, {
        json: { requesterCurrentPassword },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.superAdminUser.list.queryKey,
      });
    },
  });
};

export default useSuperAdminManageUser;
