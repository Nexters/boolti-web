export interface ConcertHallItem {
  id: number;
  name: string;
  address: string;
  isVisible: boolean;
}

export interface WebHostConcertHallListResponse {
  items: ConcertHallItem[];
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}

export interface ConcertHallLocation {
  streetAddress?: string;
  detailAddress?: string;
  latitude?: number;
  longitude?: number;
}

export interface ConcertHallCapacity {
  seatedCapacity?: number;
  standingCapacity?: number;
}

export interface ConcertHallSubwayLine {
  id: number;
  lineKey?: string;
  lineName: string;
  colorHex: string;
}

export interface ConcertHallSubwayStation {
  id: number;
  stationName: string;
  region?: string;
  lines: ConcertHallSubwayLine[];
}

export interface ConcertHallContact {
  websiteUrl?: string;
  phoneNumber?: string;
  email?: string;
}

export interface ConcertHallProfileHead {
  rentalFeeSummary?: string;
  capacity?: ConcertHallCapacity;
  location?: ConcertHallLocation;
  subwayStations?: ConcertHallSubwayStation[];
  contact?: ConcertHallContact;
}

export interface ConcertHallImage {
  id: number;
  imageUrl: string;
  thumbnailUrl?: string;
  sequence?: number;
}

export interface ConcertHallAmenity {
  type: string;
  name: string;
  count?: number | null;
}

export interface ConcertHallProfileHome {
  introduction?: string;
  images?: ConcertHallImage[];
  totalImageCount?: number;
  amenities?: ConcertHallAmenity[];
  location?: ConcertHallLocation;
}

export interface ConcertHallShare {
  shareCode?: string;
  title?: string;
  imageUrl?: string;
}

export type ConcertHallProfileDayType =
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

export interface ConcertHallProfileRentalTime {
  /** 대관 시간 (시간 단위) */
  rentalTimeHours?: number;
  /** 대관 시간 설명 */
  rentalTimeDescription?: string;
  isEngineerBreakIncluded?: boolean;
}

export interface ConcertHallProfileFee {
  id: number;
  dayType: ConcertHallProfileDayType;
  /** 요일 유형 이름 (예: 평일) */
  dayTypeName: string;
  /** 금액 (원) */
  fee: number;
  /** 노출 순서 (0부터 시작) */
  sequence: number;
}

export interface ConcertHallProfileVat {
  type: 'NONE' | 'VAT_INCLUDED' | 'VAT_EXCLUDED';
  /** 부가세 설명 (예: 부가세 별도) */
  description?: string;
}

export interface ConcertHallProfilePaidOption {
  id: number;
  name: string;
  /** 옵션 가격 (원) */
  price: number;
}

export interface ConcertHallProfileRental {
  /** 대관 방법 */
  rentalMethod?: string;
  rentalTime?: ConcertHallProfileRentalTime;
  /** 기본 대관료 목록 */
  rentalFees?: ConcertHallProfileFee[];
  vat?: ConcertHallProfileVat;
  /** 추가 비용 목록 */
  additionalFees?: ConcertHallProfileFee[];
  /** 악기 목록 텍스트 */
  instrumentsText?: string;
  /** 유상 옵션 목록 */
  paidOptions?: ConcertHallProfilePaidOption[];
  /** 특이사항 목록 */
  specialNotes?: string[];
}

export interface ConcertHallProfileResponse {
  id: number;
  name: string;
  shareCode?: string;
  representativeImageUrl?: string;
  share?: ConcertHallShare;
  hasHomeTabData?: boolean;
  hasRentalTabData?: boolean;
  head?: ConcertHallProfileHead;
  home?: ConcertHallProfileHome;
  rental?: ConcertHallProfileRental;
  informationUpdatedAt?: string;
}
