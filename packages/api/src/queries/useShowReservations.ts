import { useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';
import { ReservationStatus, TicketType } from '../types';

const useShowReservations = (
  showId: number,
  reservationNameOrPhoneNumber: string | undefined = undefined,
  ticketType: TicketType | undefined = undefined,
  ticketStatus: ReservationStatus | undefined = undefined,
) =>
  useInfiniteQuery({
    ...queryKeys.show.reservation(showId, reservationNameOrPhoneNumber, ticketType, ticketStatus),
    getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.number + 1),
    getPreviousPageParam: (firstPage) => (firstPage.first ? undefined : firstPage.number - 1),
  });

export default useShowReservations;
