import { QueryClient, useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { HostType } from '../types/host';
import { queryKeys } from '../queryKey';

interface PostHostRequest {
  userCode: string;
  type: HostType;
}

const postHost = (showId: number, body: PostHostRequest) =>
  fetcher.post(`web/v1/shows/${showId}/hosts`, { json: body });

const useAddHost = (showId: number) => {
  const queryClient = new QueryClient();
  return useMutation(({ body }: { body: PostHostRequest }) => postHost(showId, body), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.host.list(showId).queryKey });
    },
  });
};

export default useAddHost;
