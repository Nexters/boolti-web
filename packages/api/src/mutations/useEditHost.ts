import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { HostType } from '../types/host';
import { queryKeys } from '../queryKey';

interface PutHostRequest {
  type: HostType;
}

const putHost = (showId: number, hostId: number, body: PutHostRequest) =>
  fetcher.put(`web/v1/shows/${showId}/hosts/${hostId}/type`, {
    json: body,
  });

const useEditHost = (showId: number) => {
  const queryCleint = useQueryClient();
  return useMutation(
    ({ hostId, body }: { hostId: number; body: PutHostRequest }) => putHost(showId, hostId, body),
    {
      onSuccess: () => {
        queryCleint.invalidateQueries({ queryKey: queryKeys.host.list(showId).queryKey });
      },
    },
  );
};

export default useEditHost;
