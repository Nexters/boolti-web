import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';
import { TicketStatus, TicketType } from '../types';

const useShowReservations = (
  showId: number,
  page: number,
  ticketType: TicketType | undefined = undefined,
  ticketStatus: TicketStatus | undefined = undefined,
  reservationNameOrPhoneNumber: string | undefined = undefined,
) =>
  useQuery({
    ...queryKeys.show.reservation(
      showId,
      page,
      ticketType,
      ticketStatus,
      reservationNameOrPhoneNumber,
    ),
  });

export default useShowReservations;
