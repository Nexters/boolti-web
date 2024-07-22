import { QueryClient, useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

const deleteHost = (showId: number, hostId: number) =>
  fetcher.delete(`web/v1/shows/${showId}/hosts/${hostId}`);

const useDeleteHost = (showId: number) => {
  const queryClient = new QueryClient();
  return useMutation(({ hostId }: { hostId: number }) => deleteHost(showId, hostId), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.host.list(showId).queryKey });
    },
  });
};

export default useDeleteHost;
