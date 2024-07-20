export const enum HostType {
  MAIN = 'MAIN',
  MANAGER = 'MANAGER',
  SUPPORTER = 'SUPPORTER',
}

export interface HostListItem {
  /** 호스트 pk */
  hostId: number;
  /** 유저 id */
  userId: number;
  /** 호스트명 */
  hostName: string;
  /** 본인 여부 */
  self: boolean;
  /** 호스트 타입 */
  type: HostType;
}

export type HostListResponse = HostListItem[];
