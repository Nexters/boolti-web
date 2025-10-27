import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useUserVideos = (userCode: string) => {
  return useQuery({
    ...queryKeys.user.videos(userCode),
    suspense: true,
  });
};

export default useUserVideos;
