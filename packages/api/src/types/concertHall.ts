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
  informationUpdatedAt?: string;
}
