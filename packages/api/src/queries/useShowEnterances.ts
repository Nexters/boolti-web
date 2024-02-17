import { useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';
import { TicketType } from '../types';

const useShowEnterances = (
  showId: number,
  ticketType: TicketType,
  isEntered: boolean,
  reservationNameOrPhoneNumber?: string,
) =>
  useInfiniteQuery({
    ...queryKeys.enterance.list(showId, ticketType, isEntered, reservationNameOrPhoneNumber),
    getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.number + 1),
    getPreviousPageParam: (firstPage) => (firstPage.first ? undefined : firstPage.number - 1),
  });

export default useShowEnterances;
