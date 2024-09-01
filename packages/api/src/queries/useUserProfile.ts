import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useUserProfile = ({ enabled }: { enabled?: boolean } = {}) =>
  useQuery({ ...queryKeys.user.profile, enabled });

export default useUserProfile;
