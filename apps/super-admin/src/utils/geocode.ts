const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const KAKAO_LOCAL_ADDRESS_URL = 'https://dapi.kakao.com/v2/local/search/address.json';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

// 도로명/지번 주소를 카카오 주소 검색 API로 지오코딩해 좌표를 얻는다.
// 카카오 응답의 x=경도(longitude), y=위도(latitude). 키가 없거나 실패 시 null.
export const geocodeAddress = async (address: string): Promise<Coordinates | null> => {
  if (!KAKAO_REST_API_KEY || !address.trim()) {
    return null;
  }

  try {
    const url = new URL(KAKAO_LOCAL_ADDRESS_URL);
    url.searchParams.set('query', address);
    url.searchParams.set('size', '1');

    const response = await fetch(url.toString(), {
      headers: { Authorization: `KakaoAK ${KAKAO_REST_API_KEY}` },
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as { documents: Array<{ x: string; y: string }> };
    const document = data.documents[0];

    if (!document) {
      return null;
    }

    return { latitude: Number(document.y), longitude: Number(document.x) };
  } catch {
    return null;
  }
};
