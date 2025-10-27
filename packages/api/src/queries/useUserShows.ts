import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useUserShows = (userCode: string) => {
  return useQuery({
    ...queryKeys.user.shows(userCode),
    suspense: true,
  });
};

export default useUserShows;
