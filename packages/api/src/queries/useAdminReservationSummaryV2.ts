import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useAdminReservationSummaryV2 = (showId: number) =>
  useQuery({
    ...queryKeys.adminReservation.summaryV2(showId),
  });

export default useAdminReservationSummaryV2;
