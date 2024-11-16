import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useAdminTicketList = (
  showId: number,
  page: number,
  reservationNameOrPhoneNumber: string,
  salesTicketTypeId: string[],
  isUsed?: boolean,
) =>
  useQuery(
    queryKeys.adminTicket.ticketList(
      showId,
      page,
      reservationNameOrPhoneNumber,
      salesTicketTypeId,
      isUsed,
    ),
  );

export default useAdminTicketList;
