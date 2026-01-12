import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * 날짜를 "yyyy.MM.dd (요일) / HH:mm" 형식으로 포맷팅
 * @example "2025.11.01 (토) / 15:00"
 */
export const formatDateTimeWithWeekday = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'yyyy.MM.dd (eee) / HH:mm', { locale: ko });
};

/**
 * 날짜를 "yyyy.MM.dd (요일)" 형식으로 포맷팅
 * @example "2025.10.04 (금)"
 */
export const formatDateWithWeekday = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'yyyy.MM.dd (eee)', { locale: ko });
};
