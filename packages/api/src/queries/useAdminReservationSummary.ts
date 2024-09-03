import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useAdminReservationSummary = (showId: number) =>
  useQuery({
    ...queryKeys.adminReservation.summary(showId),
  });

export default useAdminReservationSummary;
