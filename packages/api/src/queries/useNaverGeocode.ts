import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { queryKeys } from '../queryKey';
import type { GeocodeCoordinates } from '../types/naverMaps';

// 네이버 지도 지오코딩 프록시(web·sa-api 그룹, 앱에 따라 분기)로 주소를 좌표로 변환한다.
// 주소 선택 시점에 한 번 호출하는 명령형 함수를 반환한다. 실패 시 null.
const useNaverGeocode = () => {
  const queryClient = useQueryClient();

  return useCallback(
    async (address: string): Promise<GeocodeCoordinates | null> => {
      if (!address.trim()) {
        return null;
      }

      try {
        const response = await queryClient.fetchQuery({
          ...queryKeys.naverMaps.geocoding(address),
          staleTime: 60_000,
        });

        const result = response.addresses?.[0];
        if (!result) {
          return null;
        }

        return { latitude: Number(result.y), longitude: Number(result.x) };
      } catch {
        return null;
      }
    },
    [queryClient],
  );
};

export default useNaverGeocode;
