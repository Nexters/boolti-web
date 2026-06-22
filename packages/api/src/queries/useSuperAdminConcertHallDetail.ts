import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useSuperAdminConcertHallDetail = (hallId: number) =>
  useQuery({
    ...queryKeys.superAdminConcertHall.detail(hallId),
    enabled: !Number.isNaN(hallId) && hallId > 0,
  });

export default useSuperAdminConcertHallDetail;
