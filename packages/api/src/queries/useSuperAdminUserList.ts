import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useSuperAdminUserList = () => useQuery(queryKeys.superAdminUser.list);

export default useSuperAdminUserList;
