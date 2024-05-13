import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

const putShowSettlementBankAccount = ({
  showId,
  bankAccountId,
}: {
  showId: number;
  bankAccountId: number;
}) =>
  fetcher.put(`web/v1/host/shows/${showId}/settlement-infos/bank-accounts`, {
    json: {
      bankAccountId,
    },
  });

const usePutShowSettlementBankAccount = (showId: number) =>
  useMutation((bankAccountId: number) => putShowSettlementBankAccount({ showId, bankAccountId }));

export default usePutShowSettlementBankAccount;
