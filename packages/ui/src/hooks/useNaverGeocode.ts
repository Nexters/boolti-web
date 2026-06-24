import { useCallback } from 'react';
import { useNavermaps } from 'react-naver-maps';

export interface GeocodeCoordinates {
  latitude: number;
  longitude: number;
}

// geocode에 필요한 최소 인터페이스. @types/navermaps 유무와 무관하게
// 동일하게 동작하도록 useNavermaps 결과를 이 형태로 캐스팅해 사용한다.
interface NaverGeocodeService {
  Service: {
    Status: { OK: string };
    geocode: (
      options: { query: string },
      callback: (
        status: string,
        response: { v2: { addresses: Array<{ x: string; y: string }> } },
      ) => void,
    ) => void;
  };
}

// 네이버 지도 geocoder로 주소를 좌표로 변환한다.
// NaverGeocodeProvider(submodules: geocoder) 컨텍스트 안에서만 사용 가능.
const useNaverGeocode = () => {
  const navermaps = useNavermaps() as unknown as NaverGeocodeService;

  return useCallback(
    (address: string) =>
      new Promise<GeocodeCoordinates | null>((resolve) => {
        if (!address.trim()) {
          resolve(null);
          return;
        }

        navermaps.Service.geocode({ query: address }, (status, response) => {
          if (status !== navermaps.Service.Status.OK) {
            resolve(null);
            return;
          }

          const result = response.v2.addresses[0];
          if (!result) {
            resolve(null);
            return;
          }

          resolve({ latitude: Number(result.y), longitude: Number(result.x) });
        });
      }),
    [navermaps],
  );
};

export default useNaverGeocode;
