import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { ShowCastTeamCreateOrUpdateRequest } from '../types';

const putCastTeams = ({
  castTeamId,
  ...json
}: ShowCastTeamCreateOrUpdateRequest & { castTeamId: number }) =>
  fetcher.put(`web/v1/cast-teams/${castTeamId}`, {
    json,
  });

const usePutCastTeams = () => useMutation({ mutationFn: putCastTeams });

export default usePutCastTeams;
