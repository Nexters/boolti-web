import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useShowSettlementInfo = (showId: number) => useQuery(queryKeys.show.settlementInfo(showId));

export default useShowSettlementInfo;
