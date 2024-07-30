import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

interface DeleteMeRequestBody {
  reason: string;
  appleIdAuthorizationCode?: string;
}

const deleteMe = (body: DeleteMeRequestBody) =>
  fetcher.delete('web/v1/users/me', { json: body });

const useDeleteMe = () =>
  useMutation((body: DeleteMeRequestBody) => deleteMe(body));

export default useDeleteMe;
