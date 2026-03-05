import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const usePreQuestionParticipants = (
  showId: number,
  page: number,
  size?: number,
  salesTicketTypeId?: string,
  reservationName?: string,
  sort?: string,
  options?: { enabled?: boolean },
) =>
  useQuery({
    ...queryKeys.preQuestion.participants(
      showId,
      page,
      size,
      salesTicketTypeId,
      reservationName,
      sort,
    ),
    enabled: options?.enabled ?? true,
  });

export default usePreQuestionParticipants;
