import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { ShowCastTeamCreateOrUpdateRequest } from '../types';

const postCastTeams = ({
  showId,
  ...json
}: ShowCastTeamCreateOrUpdateRequest & { showId: number }) =>
  fetcher.post(`web/v1/shows/${showId}/cast-teams`, {
    json,
  });

const usePostCastTeams = () => useMutation({ mutationFn: postCastTeams });

export default usePostCastTeams;
