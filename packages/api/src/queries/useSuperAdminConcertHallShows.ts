import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';
import {
  SuperAdminConcertHallShowSortBy,
  SuperAdminConcertHallShowSortDirection,
} from '../types/superAdminConcertHall';

const useSuperAdminConcertHallShows = (
  hallId: number,
  page: number,
  size?: number,
  sortBy?: SuperAdminConcertHallShowSortBy,
  direction?: SuperAdminConcertHallShowSortDirection,
) =>
  useQuery({
    ...queryKeys.superAdminConcertHall.shows(hallId, page, size, sortBy, direction),
    enabled: !Number.isNaN(hallId) && hallId > 0,
  });

export default useSuperAdminConcertHallShows;
