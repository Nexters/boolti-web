import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { queryKeys } from '../queryKey';

interface PostGiftRejectionRequest {
  giftUuid: string;
}

const rejectGift = (body: PostGiftRejectionRequest) =>
  fetcher.post<PostGiftRejectionRequest>(`web/papi/v1/gift/cancel-gift`, { json: body });

const useRejectGift = (giftUuid: string) => {
  const queryClient = useQueryClient();
  return useMutation(() => rejectGift({ giftUuid }), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.gift.info(giftUuid).queryKey });
    },
  });
};

export default useRejectGift;
