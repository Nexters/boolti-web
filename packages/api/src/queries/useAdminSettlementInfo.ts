import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useAdminSettlementInfo = (showId: number) =>
  useQuery(queryKeys.adminShow.settlementInfo(showId));

export default useAdminSettlementInfo;
