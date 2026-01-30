import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const usePreQuestionParticipantDetail = (showId: number, reservationId: number) =>
  useQuery(queryKeys.preQuestion.participantDetail(showId, reservationId));

export default usePreQuestionParticipantDetail;
