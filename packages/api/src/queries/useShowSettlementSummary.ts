import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useShowSettlementSummary = (showId: number) =>
  useQuery({
    ...queryKeys.show.settlementSummary(showId),
  });

export default useShowSettlementSummary;
