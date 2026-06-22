import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useSuperAdminConcertHallRental = (hallId: number) =>
  useQuery({
    ...queryKeys.superAdminConcertHall.rental(hallId),
    enabled: !Number.isNaN(hallId) && hallId > 0,
  });

export default useSuperAdminConcertHallRental;
