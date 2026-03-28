import { useQuery } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { HostListResponse } from '../types/host';

const useSuperAdminHostList = (showId: number) =>
  useQuery({
    queryKey: ['superAdminHost', 'list', showId],
    queryFn: () => fetcher.get<HostListResponse>(`sa-api/v1/shows/${showId}/hosts`),
  });

export default useSuperAdminHostList;
