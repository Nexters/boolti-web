import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useUserSummary = ({ enabled }: { enabled?: boolean } = {}) =>
  useQuery({ enabled, ...queryKeys.user.summary });

export default useUserSummary;
