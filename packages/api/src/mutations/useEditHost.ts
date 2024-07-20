import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { HostType } from '../types/host';

interface PutHostRequest {
  type: HostType;
}

const putHost = (showId: number, hostId: number, body: PutHostRequest) =>
  fetcher.put(`web/v1/shows/${showId}/hosts/${hostId}`, {
    json: body,
  });

const useEditHost = () =>
  useMutation(
    ({ showId, hostId, body }: { showId: number; hostId: number; body: PutHostRequest }) =>
      putHost(showId, hostId, body),
  );

export default useEditHost;
