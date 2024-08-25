import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useAdminEntranceSummary = (showId: number) =>
  useQuery(queryKeys.adminShow.entranceSummary(showId));

export default useAdminEntranceSummary;
