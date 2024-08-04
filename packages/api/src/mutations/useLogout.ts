import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

const postLogout = () => fetcher.post('web/v1/logout');

const useLogout = () => {
  return useMutation({ mutationFn: postLogout });
};

export default useLogout;
