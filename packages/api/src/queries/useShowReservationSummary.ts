import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useShowReservationSummary = (showId: number) =>
  useQuery(queryKeys.show.reservationSummary(showId));

export default useShowReservationSummary;
