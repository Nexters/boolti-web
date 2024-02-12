import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

interface SettlementAccountInfoUpdateRequest {
  bankCode: string;
  accountNumber: string;
  accountHolder: string;
}

const putUserSettlementAccountInfo = ({
  bankCode,
  accountNumber,
  accountHolder,
}: SettlementAccountInfoUpdateRequest) =>
  fetcher.put('web/v1/host/users/me/settlement-account-infos', {
    json: {
      bankCode,
      accountNumber,
      accountHolder,
    },
  });

const usePutUserSettlementAccountInfo = () =>
  useMutation({ mutationFn: putUserSettlementAccountInfo });

export default usePutUserSettlementAccountInfo;
