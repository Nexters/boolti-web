import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useGift = (giftId: string) => useQuery(queryKeys.gift.info(giftId));

export default useGift;
