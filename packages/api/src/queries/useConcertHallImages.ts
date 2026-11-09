import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

// 사진 목록/크게보기에서 전체 이미지를 조회한다. (홈 탭은 최대 5장 미리보기만 제공)
const useConcertHallImages = (concertHallId: number | null, enabled = true) =>
  useQuery({
    ...queryKeys.concertHall.images(concertHallId ?? 0),
    enabled: concertHallId != null && enabled,
  });

export default useConcertHallImages;
