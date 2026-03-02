import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

interface SuperAdminUserCreateRequest {
  identity: string;
  password: string;
}

const useSuperAdminCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: SuperAdminUserCreateRequest) =>
      fetcher.post<void>('sa-api/v1/super-admin-users', {
        json: request,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.superAdminUser.list.queryKey,
      });
    },
  });
};

export default useSuperAdminCreateUser;
