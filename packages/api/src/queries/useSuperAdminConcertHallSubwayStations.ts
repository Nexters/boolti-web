import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useSuperAdminConcertHallSubwayStations = (hallId: number) =>
  useQuery({
    ...queryKeys.superAdminConcertHall.subwayStations(hallId),
    enabled: !Number.isNaN(hallId) && hallId > 0,
  });

export default useSuperAdminConcertHallSubwayStations;
