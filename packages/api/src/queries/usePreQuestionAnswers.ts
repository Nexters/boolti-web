import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const usePreQuestionAnswers = (
  showId: number,
  preQuestionId: number,
  page: number,
  size?: number,
  salesTicketTypeId?: string,
  sort?: string,
) => useQuery(queryKeys.preQuestion.answers(showId, preQuestionId, page, size, salesTicketTypeId, sort));

export default usePreQuestionAnswers;
