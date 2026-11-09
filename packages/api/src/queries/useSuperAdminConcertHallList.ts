import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useSuperAdminConcertHallList = (page: number, size?: number, keyword?: string) =>
  useQuery(queryKeys.superAdminConcertHall.list(page, size, keyword));

export default useSuperAdminConcertHallList;
