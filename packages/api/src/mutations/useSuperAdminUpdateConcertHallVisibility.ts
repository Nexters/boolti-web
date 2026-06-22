import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

interface UpdateConcertHallVisibilityParams {
  hallId: number;
  visible: boolean;
}

const patchVisibility = ({ hallId, visible }: UpdateConcertHallVisibilityParams) =>
  fetcher.patch(`sa-api/v1/concert-halls/${hallId}/visibility`, { json: { visible } });

const useSuperAdminUpdateConcertHallVisibility = () =>
  useMutation((params: UpdateConcertHallVisibilityParams) => patchVisibility(params));

export default useSuperAdminUpdateConcertHallVisibility;
