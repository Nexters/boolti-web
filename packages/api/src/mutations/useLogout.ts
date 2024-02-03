import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { fetcher } from '../fetcher';
import LOCAL_STORAGE from '../constants/localStorage';

const postLogout = () => fetcher.post('web/v1/logout');

const useLogout = (options: UseMutationOptions) =>
  useMutation(postLogout, {
    ...options,
    onSuccess: (data, variables, context) => {
      window.localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
      window.localStorage.removeItem(LOCAL_STORAGE.REFRESH_TOKEN);

      options.onSuccess?.(data, variables, context);
    },
  });

export default useLogout;
