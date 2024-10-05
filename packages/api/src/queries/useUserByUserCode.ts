import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useUserByUserCode = (userCode: string) => {
  return useQuery({ ...queryKeys.user.userCode(userCode) });
};

export default useUserByUserCode;
