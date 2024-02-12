import { useQuery } from '@tanstack/react-query';

import { queryKey } from '../queryKey';

const useUserSummary = () => useQuery(queryKey.userSummary);

export default useUserSummary;
