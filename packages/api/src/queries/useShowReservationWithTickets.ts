import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';
import { TicketStatus, TicketType } from '../types';

const useShowReservationWithTickets = (
  showId: number,
  page: number,
  ticketType: TicketType | undefined = undefined,
  paymentManagementStatus: TicketStatus | undefined = undefined,
  reservationNameOrPhoneNumber: string | undefined = undefined,
) =>
  useQuery({
    ...queryKeys.show.reservationWithTickets(
      showId,
      page,
      ticketType,
      paymentManagementStatus,
      reservationNameOrPhoneNumber,
    ),
  });

export default useShowReservationWithTickets;
