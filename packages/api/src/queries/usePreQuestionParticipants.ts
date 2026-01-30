import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';
import { TicketType } from '../types';

const usePreQuestionParticipants = (
  showId: number,
  page: number,
  ticketType?: TicketType,
  reservationNameOrPhoneNumber?: string,
  sort?: string,
) =>
  useQuery(
    queryKeys.preQuestion.participants(
      showId,
      page,
      ticketType,
      reservationNameOrPhoneNumber,
      sort,
    ),
  );

export default usePreQuestionParticipants;
