import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useSettlementBanners = (bannerType: 'REQUIRED' | 'DONE') => useQuery(queryKeys.show.settlementBanners(bannerType));

export default useSettlementBanners;
