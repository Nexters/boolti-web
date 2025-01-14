import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useSuperAdminShowSettlementStatement = (showId: number, options?: { enabled?: boolean }) =>
  useQuery({
    ...queryKeys.adminShow.settlementStatement(showId),
    enabled: options?.enabled,
  });

export default useSuperAdminShowSettlementStatement;
