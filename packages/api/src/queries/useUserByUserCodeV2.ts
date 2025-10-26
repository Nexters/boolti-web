import { queryKeys } from '../queryKey';
import { useQuery } from '@tanstack/react-query';

const useUserByUserCodeV2 = (userCode: string) => {
  return useQuery({
    ...queryKeys.user.userCodeV2(userCode),
    suspense: true,
  });
};

export default useUserByUserCodeV2;
