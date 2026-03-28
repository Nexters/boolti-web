import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

const removeHost = (showId: number, hostId: number) =>
  fetcher.delete(`sa-api/v1/shows/${showId}/hosts/${hostId}`);

const useSuperAdminRemoveHost = (showId: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ hostId }: { hostId: number }) => removeHost(showId, hostId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['superAdminHost', 'list', showId] });
      },
    },
  );
};

export default useSuperAdminRemoveHost;
