import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import type { HostType } from '../types/host';

interface AddHostRequest {
  userCode: string;
  type: HostType;
}

const addHost = (showId: number, body: AddHostRequest) =>
  fetcher.post(`sa-api/v1/shows/${showId}/hosts`, { json: body });

const useSuperAdminAddHost = (showId: number) => {
  const queryClient = useQueryClient();
  return useMutation(({ body }: { body: AddHostRequest }) => addHost(showId, body), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['superAdminHost', 'list', showId] });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['superAdminHost', 'list', showId] });
    },
  });
};

export default useSuperAdminAddHost;
