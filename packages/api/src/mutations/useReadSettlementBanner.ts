import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

const readSettlementBanner = (showId: number, bannerType: 'REQUIRED' | 'DONE') =>
  fetcher.post(`web/v1/host/settlement-banners/${showId}/${bannerType}/read`);

const useReadSettlementBanner = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ showId, bannerType }: { showId: number; bannerType: 'REQUIRED' | 'DONE' }) =>
      readSettlementBanner(showId, bannerType),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.show.settlementBanners.queryKey });
      },
    },
  );
};

export default useReadSettlementBanner;
