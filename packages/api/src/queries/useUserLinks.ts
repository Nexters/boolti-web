import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useUserLinks = (userCode: string) => {
  return useQuery({
    ...queryKeys.user.links(userCode),
    suspense: true,
  });
};

export default useUserLinks;
