import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { HostType } from '../types/host';

interface PostHostRequest {
  email: string;
  type: HostType;
}

const postHost = (showId: number, body: PostHostRequest) =>
  fetcher.post(`web/v1/shows/${showId}/hosts`, {
    json: body,
  });

const useAddHost = () =>
  useMutation(({ showId, body }: { showId: number; body: PostHostRequest }) =>
    postHost(showId, body),
  );

export default useAddHost;
