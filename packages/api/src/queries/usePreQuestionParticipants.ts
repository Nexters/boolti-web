import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const usePreQuestionParticipants = (
  showId: number,
  page: number,
  salesTicketTypeId?: string,
  reservationName?: string,
  sort?: 'ASC' | 'DESC',
  options?: { enabled?: boolean },
) =>
  useQuery({
    ...queryKeys.preQuestion.participants(showId, page, salesTicketTypeId, reservationName, sort),
    enabled: options?.enabled ?? true,
  });

export default usePreQuestionParticipants;
