import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

interface PostChangeCastTeamOrderRequest {
  castTeamIds: number[];
}

const postChangeCastTeamOrder = (showId: number, body: PostChangeCastTeamOrderRequest) =>
  fetcher.post(`web/v1/shows/${showId}/cast-teams/change-sequence`, { json: body });

const useChangeCastTeamOrder = () =>
  useMutation(({ showId, body }: { showId: number; body: PostChangeCastTeamOrderRequest }) =>
    postChangeCastTeamOrder(showId, body),
  );

export default useChangeCastTeamOrder;
