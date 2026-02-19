import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const usePreQuestionAnswers = (
  showId: number,
  preQuestionId: number,
  page: number,
  size?: number,
  salesTicketTypeId?: string,
  sort?: string,
  options?: { enabled?: boolean },
) =>
  useQuery({
    ...queryKeys.preQuestion.answers(showId, preQuestionId, page, size, salesTicketTypeId, sort),
    enabled: options?.enabled ?? true,
  });

export default usePreQuestionAnswers;
