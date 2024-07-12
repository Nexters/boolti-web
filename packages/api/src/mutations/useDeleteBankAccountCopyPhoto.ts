import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

const deleteBankAccountCopyPhoto = (showId: string) =>
  fetcher.delete(`web/v1/host/shows/${showId}/settlement-infos/bank_account_copy_photo`);

const useDeleteBankAccountCopyPhoto = (showId: number) =>
  useMutation(() => deleteBankAccountCopyPhoto(`${showId}`));

export default useDeleteBankAccountCopyPhoto;
