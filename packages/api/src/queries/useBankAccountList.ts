import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useBankAccountList = () => useQuery(queryKeys.user.bankAccountList);

export default useBankAccountList;
