import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useUserPreviousShows = (userCode: string) => {
  return useQuery({
    ...queryKeys.user.previousShows(userCode),
    suspense: true,
  });
};

export default useUserPreviousShows;
