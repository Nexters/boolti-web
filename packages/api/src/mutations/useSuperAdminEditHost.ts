import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { HostType } from '../types/host';

const editHost = (showId: number, hostId: number, body: { type: HostType }) =>
  fetcher.put(`sa-api/v1/shows/${showId}/hosts/${hostId}/type`, { json: body });

const useSuperAdminEditHost = (showId: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ hostId, body }: { hostId: number; body: { type: HostType } }) =>
      editHost(showId, hostId, body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['superAdminHost', 'list', showId] });
      },
      onError: () => {
        queryClient.invalidateQueries({ queryKey: ['superAdminHost', 'list', showId] });
      },
    },
  );
};

export default useSuperAdminEditHost;
