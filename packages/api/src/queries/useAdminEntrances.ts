import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';
import { TicketType } from '../types';

const useAdminEntrances = (
  showId: number,
  page: number,
  isEntered: boolean,
  ticketType?: TicketType,
  reservationNameOrPhoneNumber?: string,
) =>
  useQuery({
    ...queryKeys.adminEntrance.list(
      showId,
      page,
      isEntered,
      ticketType,
      reservationNameOrPhoneNumber,
    ),
  });

export default useAdminEntrances;
