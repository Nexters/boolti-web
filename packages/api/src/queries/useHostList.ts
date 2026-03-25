import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useHostList = (showId: number, options?: { enabled?: boolean }) =>
  useQuery({ ...queryKeys.host.list(showId), ...options });

export default useHostList;
