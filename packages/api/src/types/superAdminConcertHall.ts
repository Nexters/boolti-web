export type SuperAdminConcertHallVatType = 'NONE' | 'VAT_INCLUDED' | 'VAT_EXCLUDED';

/** 대관료/시간당 추가 요금 요일 분류 */
export type SuperAdminConcertHallRentalDayType =
  | 'ANYTIME'
  | 'MON_TO_THU'
  | 'WEEKDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY'
  | 'FRI_TO_SUN'
  | 'WEEKEND'
  | 'HOLIDAY'
  | 'PRE_HOLIDAY_WEEKDAY';

export interface SuperAdminConcertHallItem {
  /** 공연장 ID */
  id: number;
  /** 공연장명 */
  name: string;
  /** 주소 (미등록 시 빈 문자열) */
  address?: string;
  /** 노출 여부 */
  isVisible: boolean;
  /** 대표 이미지 썸네일 (미등록 시 null) */
  thumbnailUrl?: string | null;
  /** 정보 최종 수정 일시 (ISO8601, 수정 이력 없으면 null) */
  informationUpdatedAt?: string | null;
}

export interface SuperAdminConcertHallListResponse {
  items: SuperAdminConcertHallItem[];
  /** 현재 페이지 번호 (0부터 시작) */
  currentPage: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
}

export interface SuperAdminConcertHallCreateRequest {
  name: string;
}

export interface SuperAdminConcertHallCreateResponse {
  id: number;
  shareCode: string;
}

export interface SuperAdminConcertHallLocation {
  streetAddress?: string;
  detailAddress?: string;
  latitude?: number;
  longitude?: number;
}

export interface SuperAdminConcertHallCapacity {
  seatedCapacity?: number;
  standingCapacity?: number;
}

export interface SuperAdminConcertHallContact {
  websiteUrl?: string;
  phoneNumber?: string;
  email?: string;
}

export interface SuperAdminConcertHallRentalTime {
  rentalTimeHours?: number;
  isEngineerBreakIncluded?: boolean;
}

export interface SuperAdminConcertHallAmenities {
  hasWaitingRoom?: boolean;
  waitingRoomCount?: number;
  hasSecondFloorSeating?: boolean;
  hasIndoorRestroom?: boolean;
  hasCabinet?: boolean;
  cabinetCount?: number;
  hasAlcoholSales?: boolean;
  hasParking?: boolean;
  parkingCount?: number;
}

export interface SuperAdminConcertHallImage {
  id: number;
  imageUrl: string;
  thumbnailUrl: string;
  /** 노출 순서 */
  sequence: number;
}

/** GET /concert-halls/{id} — 공연장 기본 정보 상세 (대관 정보는 별도 엔드포인트로 분리됨) */
/** 공연장에 지정된 상권/지역 */
export interface SuperAdminConcertHallRegion {
  regionId: number;
  /** 지역명 (예: 홍대/연남/연희) */
  name: string;
  groupId: number;
  /** 지역 그룹명 (예: 서북) */
  groupName: string;
}

export interface SuperAdminConcertHallRegionItem {
  regionId: number;
  name: string;
  /** 그룹 내 노출 순서 */
  sequence: number;
}

/** GET /concert-hall-region-groups — 상권/지역 그룹 목록 */
export interface SuperAdminConcertHallRegionGroup {
  groupId: number;
  name: string;
  /** 그룹 노출 순서 */
  sequence: number;
  regions: SuperAdminConcertHallRegionItem[];
}

export interface SuperAdminConcertHallDetailResponse {
  id: number;
  name: string;
  shareCode: string;
  isVisible: boolean;
  introduction?: string;
  representativeImageUrl?: string;
  images?: SuperAdminConcertHallImage[];
  location?: SuperAdminConcertHallLocation;
  contact?: SuperAdminConcertHallContact;
  amenities?: SuperAdminConcertHallAmenities;
  /** 지정된 상권/지역이 없으면 null */
  region?: SuperAdminConcertHallRegion | null;
  /** ISO8601 */
  informationUpdatedAt?: string;
  hasHomeTabData?: boolean;
  hasRentalTabData?: boolean;
}

export interface SuperAdminConcertHallVisibilityUpdateRequest {
  visible: boolean;
}

export type SuperAdminConcertHallShowSortBy = 'CREATED_AT' | 'SHOW_DATE';
export type SuperAdminConcertHallShowSortDirection = 'ASC' | 'DESC';

export interface SuperAdminConcertHallShowItem {
  /** 공연장 데이터 연결 ID */
  concertHallShowId: number;
  /** 공연일 (yyyy-MM-dd) */
  showDate: string;
  showName: string;
  hostName?: string;
  /** 불티 공연 ID로 연결된 경우 true, 직접 입력인 경우 false */
  isLinked: boolean;
  posterImageUrl?: string;
  /** 외부 홍보 링크 */
  externalLink?: string;
}

export interface SuperAdminConcertHallShowListResponse {
  items: SuperAdminConcertHallShowItem[];
  /** 현재 페이지 번호 (0부터 시작) */
  currentPage: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
}

export interface SuperAdminConcertHallShowManualRequest {
  /** 공연일 (yyyy-MM-dd) */
  showDate: string;
  showName: string;
  /** 공연 포스터 이미지 URL (필수) */
  posterImageUrl: string;
  /** 외부 홍보 링크 */
  externalLink?: string;
}

export interface SuperAdminConcertHallShowFromBooltiRequest {
  /** 불티 공연 ID */
  showId: number;
}

export interface SuperAdminConcertHallShowValidateResponse {
  showName: string;
  /** 공연일 (yyyy-MM-dd) */
  showDate: string;
  hostName: string;
}

export interface SuperAdminConcertHallShowCreateResponse {
  concertHallShowId: number;
  showDate: string;
  showName: string;
  hostName?: string;
  isLinked: boolean;
  posterImageUrl?: string;
  externalLink?: string;
}

export interface SuperAdminSubwayLine {
  lineId: number;
  lineName: string;
  /** 노선 색상 코드 (#rrggbb) */
  colorHex: string;
}

export interface SuperAdminConcertHallSubwayStation {
  /** 공연장-지하철역 연결 ID */
  id: number;
  stationId: number;
  stationName: string;
  /** 지역 (동명이역 구분) */
  region: string;
  /** 노출 순서 (0부터 시작) */
  sequence: number;
  lines: SuperAdminSubwayLine[];
}

export interface SubwayStationSearchItem {
  stationId: number;
  stationName: string;
  region: string;
  lines: SuperAdminSubwayLine[];
}

export interface SuperAdminConcertHallSubwayStationSaveRequest {
  /** 저장할 지하철역 ID 목록 (순서가 노출 순서) */
  stationIds: number[];
}

/** PUT /concert-halls/{id} 의 images 항목 */
export interface SuperAdminConcertHallUpdateImage {
  imageUrl: string;
  thumbnailUrl: string;
}

/** PUT /concert-halls/{id} — 공연장 정보 수정 (대관 정보는 별도 엔드포인트) */
export interface SuperAdminConcertHallUpdateRequest {
  name: string;
  /** 공유 코드 (소문자·숫자, 최대 20자) */
  shareCode: string;
  /** 상권/지역 ID. null이면 지역 선택 해제 */
  regionId?: number | null;
  introduction?: string;
  representativeImageUrl?: string;
  location?: SuperAdminConcertHallLocation;
  contact?: SuperAdminConcertHallContact;
  amenities?: SuperAdminConcertHallAmenities;
  /** 갤러리 사진 (최대 20장) */
  images?: SuperAdminConcertHallUpdateImage[];
}

export interface SuperAdminConcertHallRentalFee {
  dayType: SuperAdminConcertHallRentalDayType;
  /** 대관료 (원) */
  fee: number;
  /** 기본 대관료로 노출 (정확히 1개만 true) */
  isDefault: boolean;
}

export interface SuperAdminConcertHallAdditionalFee {
  dayType: SuperAdminConcertHallRentalDayType;
  /** 시간당 추가 요금 (원) */
  fee: number;
}

export interface SuperAdminConcertHallPaidOption {
  name: string;
  /** 옵션 가격 (원) */
  price: number;
}

/** PUT /concert-halls/{id}/rental — 대관 정보 수정 */
export interface SuperAdminConcertHallRentalUpdateRequest {
  rentalMethod?: string;
  rentalTimeHours?: number;
  isEngineerBreakIncluded?: boolean;
  vatType?: SuperAdminConcertHallVatType;
  capacity?: SuperAdminConcertHallCapacity;
  instrumentsText?: string;
  rentalFees?: SuperAdminConcertHallRentalFee[];
  additionalFees?: SuperAdminConcertHallAdditionalFee[];
  paidOptions?: SuperAdminConcertHallPaidOption[];
  specialNotes?: string[];
}

/** GET /concert-halls/{id}/rental — 대관 정보 상세 (구조화 배열 포함) */
export interface SuperAdminConcertHallRentalResponse {
  rentalMethod?: string;
  rentalTime?: SuperAdminConcertHallRentalTime;
  vatType?: SuperAdminConcertHallVatType;
  capacity?: SuperAdminConcertHallCapacity;
  instrumentsText?: string;
  specialNotes?: string[];
  rentalFees?: SuperAdminConcertHallRentalFee[];
  additionalFees?: SuperAdminConcertHallAdditionalFee[];
  paidOptions?: SuperAdminConcertHallPaidOption[];
}
