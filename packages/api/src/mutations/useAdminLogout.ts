import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { LOCAL_STORAGE } from '../constants';
import { fetcher } from '../fetcher';

const postLogout = () => fetcher.post('sa-api/v1/logout');

const useAdminLogout = (options?: UseMutationOptions) =>
  useMutation(postLogout, {
    ...options,
    onSuccess: (data, variables, context) => {
      window.localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
      window.localStorage.removeItem(LOCAL_STORAGE.REFRESH_TOKEN);

      options?.onSuccess?.(data, variables, context);
    },
  });

export default useAdminLogout;
