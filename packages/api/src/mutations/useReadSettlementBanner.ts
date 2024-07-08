import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

const readSettlementBanner = (showId: number, bannerType: 'REQUIRED' | 'DONE') =>
  fetcher.post(`web/v1/host/settlement-banners/${showId}/${bannerType}/read`);

const useReadSettlementBanner = () => useMutation(({ showId, bannerType }: { showId: number, bannerType: 'REQUIRED' | 'DONE' }) => readSettlementBanner(showId, bannerType));

export default useReadSettlementBanner;
