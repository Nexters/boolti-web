import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const usePreQuestions = (showId: number) => useQuery(queryKeys.preQuestion.list(showId));

export default usePreQuestions;
