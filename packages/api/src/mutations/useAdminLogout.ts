import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

const postLogout = () => fetcher.post('sa-api/v1/logout');

const useAdminLogout = (options?: UseMutationOptions) =>
  useMutation(postLogout, {
    ...options,
  });

export default useAdminLogout;
