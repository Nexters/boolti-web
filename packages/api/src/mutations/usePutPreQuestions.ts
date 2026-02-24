import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { PreQuestionsUpdateRequest } from '../types';

interface PutPreQuestionsParams extends PreQuestionsUpdateRequest {
  showId: number;
}

const putPreQuestions = ({ showId, ...json }: PutPreQuestionsParams) =>
  fetcher.put(`web/v1/host/shows/${showId}/pre-questions`, {
    json,
  });

const usePutPreQuestions = () => useMutation({ mutationFn: putPreQuestions });

export default usePutPreQuestions;
