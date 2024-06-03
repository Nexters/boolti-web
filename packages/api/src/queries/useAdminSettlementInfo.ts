import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useAdminSettlementInfo = (showId: number) =>
  useQuery(queryKeys.superAdmin.settlementInfo(showId));

export default useAdminSettlementInfo;
