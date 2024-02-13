import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useUserAccountInfo = () => useQuery(queryKeys.user.accountInfo);

export default useUserAccountInfo;
