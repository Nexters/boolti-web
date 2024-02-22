import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';
import { TicketType } from '../types';

const useShowEnterances = (
  showId: number,
  page: number,
  isEntered: boolean,
  ticketType?: TicketType,
  reservationNameOrPhoneNumber?: string,
) =>
  useQuery({
    ...queryKeys.enterance.list(showId, page, isEntered, ticketType, reservationNameOrPhoneNumber),
  });

export default useShowEnterances;
