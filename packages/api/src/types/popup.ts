export interface Popup {
  id: number;
  type: 'EVENT' | 'NOTICE';
  eventUrl: string | null;
  view: 'Home';
  noticeTitle: string | null;
  description: string;
  startDate: string;
  endDate: string;
}
