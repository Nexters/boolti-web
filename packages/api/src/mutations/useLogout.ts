import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { LOCAL_STORAGE } from '../constants';
import { fetcher } from '../fetcher';

const postLogout = () => fetcher.post('web/v1/logout');

const useLogout = (options?: UseMutationOptions) =>
  useMutation(postLogout, {
    ...options,
    onSuccess: (data, variables, context) => {
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      } else {
        window.localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
        window.localStorage.removeItem(LOCAL_STORAGE.REFRESH_TOKEN);
      }
    },
  });

export default useLogout;
