import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useShowSettlementStatement = (showId: number) =>
  useQuery(queryKeys.show.settlementStatement(showId));

export default useShowSettlementStatement;
