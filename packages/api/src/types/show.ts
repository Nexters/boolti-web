export interface ShowImage {
  sequence: number;
  thumbnailPath: string;
  path: string;
}

export interface ShowPlace {
  name: string;
  streetAddress: string;
  detailAddress: string;
}

export interface ShowHost {
  name: string;
  phoneNumber: string;
}

export interface ShowResponse {
  id: number;
  name: string;
  images: ShowImage[];
  date: string;
  runningTime: number;
  place: ShowPlace;
  notice: string;
  host: ShowHost;
  isEnded: boolean;
}

export type ShowSummaryResponse = Array<{
  /** 공연 ID */
  id: number;
  /** 공연 이름 */
  title: string;
  /** 공연 포스터 이미지 경로(썸네일) */
  thumbnailPath: string;
  /** 공연 대표 호스트 ID */
  hostUserId: number;
  /** 공연 대표 호스트 이름 */
  hostName: string;
  /** 공연 판매 시작 날짜, 시간.ISO8601 */
  salesStartTime: string;
  /**공연 판매 종료 날짜, 시간.ISO8601 */
  salesEndTime: string;
  /** 공연 시작 날짜, 시간.ISO8601 */
  date: string;
  /** 러닝 타임.분 */
  runningTime: number;
  /** 공연 생성 시간.ISO8601. */
  createdAt: string;
  /** 공연 수정 시간.ISO8601 */
  modifiedAt: string;
}>;

export interface ShowSalesInfoResponse {
  showId: number;
  salesStartTime: string;
  salesEndTime: string;
  ticketNotice: string;
}

export type ShowSalesTicketResponse = {
  id: number;
  ticketName: string;
  price: number;
  quantity: number;
  totalForSale: number;
}[];

export type ShowInvitationTicketResponse = {
  id: number;
  ticketName: string;
  price: number;
  quantity: number;
  totalForSale: number;
}[];

export type ShowInvitationCodeListResponse = {
  id: number;
  code: string;
  used: boolean;
}[];
