import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

const deleteHost = (showId: number, hostId: number) =>
  fetcher.delete(`web/v1/shows/${showId}/hosts/${hostId}`);

const useDeleteHost = (showId: number) => {
  const queryClient = useQueryClient();
  return useMutation(({ hostId }: { hostId: number }) => deleteHost(showId, hostId), {
    onSuccess: (_mutationResponse, variables: { hostId: number; self: boolean }) => {
      if (variables.self) {
        queryClient.invalidateQueries({ queryKey: queryKeys.show.list.queryKey });
      } else {
        queryClient.invalidateQueries({ queryKey: queryKeys.host.list(showId).queryKey });
      }
    },
  });
};

export default useDeleteHost;
