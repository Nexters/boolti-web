import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

const deleteHost = (showId: number, hostId: number) =>
  fetcher.delete(`web/v1/shows/${showId}/hosts/${hostId}`);

const useDeleteHost = () =>
  useMutation(({ showId, hostId }: { showId: number; hostId: number }) =>
    deleteHost(showId, hostId),
  );

export default useDeleteHost;
