import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useSettlementBanners = () =>
  useQuery(queryKeys.show.settlementBanners);

export default useSettlementBanners;
