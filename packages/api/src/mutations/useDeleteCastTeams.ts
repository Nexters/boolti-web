import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

const deleteCastTeams = (castTeamId: number) =>
  fetcher.delete(`web/v1/cast-teams/${castTeamId}`, {});

const useDeleteCastTeams = () => useMutation({ mutationFn: deleteCastTeams });

export default useDeleteCastTeams;
