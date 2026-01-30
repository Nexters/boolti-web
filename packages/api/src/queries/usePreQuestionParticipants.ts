import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const usePreQuestionParticipants = (
  showId: number,
  page: number,
  salesTicketTypeId?: number,
  reservationName?: string,
  sort?: 'ASC' | 'DESC',
) =>
  useQuery(
    queryKeys.preQuestion.participants(
      showId,
      page,
      salesTicketTypeId,
      reservationName,
      sort,
    ),
  );

export default usePreQuestionParticipants;
