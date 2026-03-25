import { useMutation, useQueryClient } from '@tanstack/react-query';

import { instance } from '../fetcher';
import { queryKeys } from '../queryKey';

const hideShow = (showId: number, hide: boolean) =>
  instance.post(`sa-api/v1/shows/${showId}/hide`, { searchParams: { hide } });

const useHideShow = (showId: number) => {
  const queryClient = useQueryClient();
  return useMutation((hide: boolean) => hideShow(showId, hide), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.adminShow.showDetail(showId).queryKey });
    },
  });
};

export default useHideShow;
