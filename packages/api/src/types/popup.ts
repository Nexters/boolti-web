export interface Popup {
  id: number;
  type: 'Event' | 'Notice';
  eventUrl: string | null;
  view: 'Home';
  noticeTitle: string | null;
  description: string;
  startDate: string;
  endDate: string;
}
