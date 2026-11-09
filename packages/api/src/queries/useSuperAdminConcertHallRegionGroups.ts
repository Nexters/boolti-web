import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useSuperAdminConcertHallRegionGroups = () =>
  useQuery(queryKeys.superAdminConcertHall.regionGroups);

export default useSuperAdminConcertHallRegionGroups;
