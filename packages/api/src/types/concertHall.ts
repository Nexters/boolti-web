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

export interface ConcertHallProfileHead {
  rentalFeeSummary?: string;
  location?: ConcertHallLocation;
}

export interface ConcertHallProfileResponse {
  id: number;
  name: string;
  shareCode?: string;
  representativeImageUrl?: string;
  head?: ConcertHallProfileHead;
  informationUpdatedAt?: string;
}
