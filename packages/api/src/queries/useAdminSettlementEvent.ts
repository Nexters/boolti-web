import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useAdminSettlementEvent = (showId: number) =>
  useQuery(queryKeys.adminShow.settlementEvent(showId));

export default useAdminSettlementEvent;
