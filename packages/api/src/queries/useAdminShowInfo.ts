import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useAdminShowInfo = (showId: number) =>
  useQuery({
    ...queryKeys.adminShow.info(showId),
  });

export default useAdminShowInfo;
