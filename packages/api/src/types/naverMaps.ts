export interface GeocodeCoordinates {
  latitude: number;
  longitude: number;
}

/** 네이버 지도 지오코딩 응답의 개별 주소 항목 */
export interface NaverGeocodingAddress {
  roadAddress: string;
  jibunAddress: string;
  englishAddress: string;
  /** 경도 */
  x: string;
  /** 위도 */
  y: string;
  distance: number;
}

/**
 * GET {web|sa-api}/v1/naver-maps/geocoding — 네이버 지도 지오코딩 프록시 응답.
 * 백엔드가 네이버 지오코딩 REST 응답을 그대로 전달한다.
 */
export interface NaverGeocodingResponse {
  status: string;
  meta: {
    totalCount: number;
    page: number;
    count: number;
  };
  addresses: NaverGeocodingAddress[];
  errorMessage: string;
}
