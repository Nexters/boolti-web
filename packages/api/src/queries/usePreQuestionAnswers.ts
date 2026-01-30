import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const usePreQuestionAnswers = (
  showId: number,
  preQuestionId: number,
  page: number,
  sort?: string,
) => useQuery(queryKeys.preQuestion.answers(showId, preQuestionId, page, sort));

export default usePreQuestionAnswers;
