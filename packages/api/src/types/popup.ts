export interface Popup {
  id: number;
  type: 'EVENT' | 'NOTICE';
  eventUrl: string | null;
  noticeTitle: string | null;
  description: string;
  startDate: string;
  endDate: string;
}

export type PopupViewType = 'HOME' | 'SHOW' | 'LANDING';
