import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';
import { TicketStatus, TicketType } from '../types';

const useAdminReservations = (
  showId: number,
  page: number,
  ticketType: TicketType | undefined = undefined,
  ticketStatus: TicketStatus | undefined = undefined,
  reservationNameOrPhoneNumber: string | undefined = undefined,
) =>
  useQuery({
    ...queryKeys.adminReservation.list(
      showId,
      page,
      ticketType,
      ticketStatus,
      reservationNameOrPhoneNumber,
    ),
  });

export default useAdminReservations;
