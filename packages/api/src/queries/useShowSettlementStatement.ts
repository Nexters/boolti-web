import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useShowSettlementStatement = (showId: number, options?: { enabled?: boolean }) =>
  useQuery({
    ...queryKeys.show.settlementStatement(showId),
    enabled: options?.enabled,
  });

export default useShowSettlementStatement;
