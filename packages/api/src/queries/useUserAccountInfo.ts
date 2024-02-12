import { useQuery } from '@tanstack/react-query';

import { queryKey } from '../queryKey';

const useUserAccountInfo = () => useQuery(queryKey.userAccountInfo);

export default useUserAccountInfo;
