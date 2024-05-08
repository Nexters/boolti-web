import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

interface PostAddBankAccountRequest {
  bankCode: string;
  accountNumber: string;
  accountHolder: string;
}

interface PostAddBankAccountResponse {
  backAccountId: number;
}

const postBankAccount = (body: PostAddBankAccountRequest) =>
  fetcher.post<PostAddBankAccountResponse>('web/v1/host/users/me/bank-accounts', {
    json: body,
  });

const useAddBankAccount = () =>
  useMutation((body: PostAddBankAccountRequest) => postBankAccount(body));

export default useAddBankAccount;
