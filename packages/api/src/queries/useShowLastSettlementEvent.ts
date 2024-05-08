import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useShowLastSettlementEvent = (showId: number) =>
  useQuery(queryKeys.show.lastSettlementEvent(showId));

export default useShowLastSettlementEvent;
