import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useAdminShowList = (
  page: number,
  size: number,
  showNameOrHostName?: string,
  sueperAdminShowStatus?: string,
) => useQuery(queryKeys.adminShow.list(page, size, showNameOrHostName, sueperAdminShowStatus));

export default useAdminShowList;
