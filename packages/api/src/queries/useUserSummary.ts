import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useUserSummary = ({ enabled }: { enabled?: boolean } = {}) =>
  useQuery({ ...queryKeys.user.summary, enabled });

export default useUserSummary;
