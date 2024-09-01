import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useAdminEntranceSummary = (showId: number) =>
  useQuery(queryKeys.adminEntrance.summary(showId));

export default useAdminEntranceSummary;
