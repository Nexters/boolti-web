import { useQueries } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const usePreQuestionAnswersList = (
  showId: number,
  preQuestionIds: number[],
  page: number,
  size?: number,
  salesTicketTypeId?: string,
  sort?: string,
  options?: { enabled?: boolean },
) =>
  useQueries({
    queries: preQuestionIds.map((preQuestionId) => ({
      ...queryKeys.preQuestion.answers(
        showId,
        preQuestionId,
        page,
        size,
        salesTicketTypeId,
        sort,
      ),
      enabled: options?.enabled ?? true,
    })),
  });

export default usePreQuestionAnswersList;
