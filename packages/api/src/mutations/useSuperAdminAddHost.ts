import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { HostType } from '../types/host';

interface BulkHostAddRequest {
  showId: number;
  userCode: string;
  type: HostType;
}

const bulkHostAdd = (body: BulkHostAddRequest) =>
  fetcher.post('sa-api/v1/shows/bulk-host-add', { json: body });

const useSuperAdminAddHost = (showId: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ body }: { body: { userCode: string; type: HostType } }) =>
      bulkHostAdd({ showId, ...body }),
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

export default useSuperAdminAddHost;
