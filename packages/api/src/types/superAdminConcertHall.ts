export type SuperAdminConcertHallVatType = 'NONE' | 'VAT_INCLUDED' | 'VAT_EXCLUDED';

export interface SuperAdminConcertHallItem {
  /** 공연장 ID */
  id: number;
  /** 공연장명 */
  name: string;
  /** 주소 */
  address?: string;
  /** 노출 여부 */
  isVisible: boolean;
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
  rentalTimeDescription?: string;
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

export interface SuperAdminConcertHallDetailResponse {
  id: number;
  name: string;
  shareCode: string;
  isVisible: boolean;
  /** 상세주소 (지층 등) */
  floor?: string;
  introduction?: string;
  representativeImageUrl?: string;
  location?: SuperAdminConcertHallLocation;
  capacity?: SuperAdminConcertHallCapacity;
  contact?: SuperAdminConcertHallContact;
  rentalMethod?: string;
  rentalTime?: SuperAdminConcertHallRentalTime;
  rentalFeeDescription?: string;
  vatType?: SuperAdminConcertHallVatType;
  instrumentsText?: string;
  specialNotes?: string[];
  amenities?: SuperAdminConcertHallAmenities;
  /** ISO8601 */
  informationUpdatedAt?: string;
  hasHomeTabData: boolean;
  hasRentalTabData: boolean;
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
