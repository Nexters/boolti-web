import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';
import { SuperAdminShowStatus } from '../types/adminShow';

const useAdminShowList = (
  page: number,
  size: number,
  showNameOrHostName?: string,
  sueperAdminShowStatus?: SuperAdminShowStatus,
) => useQuery(queryKeys.adminShow.list(page, size, showNameOrHostName, sueperAdminShowStatus));

export default useAdminShowList;
