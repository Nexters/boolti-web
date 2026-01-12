import { queryKeys } from '../queryKey';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../fetcher';
import type { UserProfileResponseV2 } from '../types';

const useUserByUserCodeV2 = (userCode: string) => {
  return useQuery<UserProfileResponseV2 | undefined>({
    ...queryKeys.user.userCodeV2(userCode),
    retry: false,
    refetchOnWindowFocus: false,
    useErrorBoundary: false,
    queryFn: async () => {
      try {
        const response = await fetcher.get(`web/papi/v2/users/${userCode}`);
        return response as UserProfileResponseV2;
      } catch (error) {
        if (error instanceof Response && error.status === 404) {
          return undefined;
        }
        throw error;
      }
    },
  });
};

export default useUserByUserCodeV2;
