import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const usePreQuestionParticipantDetail = (
  showId: number,
  reservationId: number,
  options?: { enabled?: boolean },
) =>
  useQuery({
    ...queryKeys.preQuestion.participantDetail(showId, reservationId),
    enabled: options?.enabled ?? true,
  });

export default usePreQuestionParticipantDetail;
