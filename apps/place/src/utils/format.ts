import type { ConcertHallAmenity, ConcertHallCapacity, ConcertHallLocation } from '@boolti/api';

export const formatUpdatedAt = (iso?: string) => {
  if (!iso) {
    return null;
  }

  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${date.getFullYear()}.${month}.${day}`;
};

export const formatCapacity = (capacity?: ConcertHallCapacity) => {
  const parts: string[] = [];

  if (capacity?.seatedCapacity != null) {
    parts.push(`좌석 ${capacity.seatedCapacity.toLocaleString()}석`);
  }

  if (capacity?.standingCapacity != null) {
    parts.push(`스탠딩 ${capacity.standingCapacity.toLocaleString()}명`);
  }

  return parts.length > 0 ? parts.join(' / ') : null;
};

export const formatAddress = (location?: ConcertHallLocation) => {
  const parts = [location?.streetAddress, location?.detailAddress].filter(Boolean);

  return parts.length > 0 ? parts.join(' ') : null;
};

export const formatAmenityLabel = ({ type, name, count }: ConcertHallAmenity) => {
  if (count == null) {
    return name;
  }

  if (type === 'PARKING') {
    return `${name} ${count.toLocaleString()}대 가능`;
  }

  return `${name} ${count.toLocaleString()}개`;
};

export const formatFee = (fee: number) => `${fee.toLocaleString()}원`;

export const normalizeWebsiteUrl = (url: string) =>
  /^https?:\/\//i.test(url) ? url : `https://${url}`;

// 비숫자 노선의 뱃지 라벨 매핑 (디자인 기준). 키는 지역 접두사 제거 후의 노선명.
const SUBWAY_LINE_LABEL_MAP: Record<string, string> = {
  신분당선: '신분당',
  분당선: '분당',
  수인분당선: '분당',
  '경의·중앙선': '경의',
  경의중앙선: '경의',
  경춘선: '경춘',
  공항철도: '공항',
  의정부경전철: '의정',
  용인경전철: '용인',
  용인에버라인: '용인',
  경강선: '경강',
  우이신설선: '우이',
  서해선: '서해',
  김포골드라인: '김포',
  신림선: '신림',
};

// 노선 이름 -> 뱃지 라벨.
// "수도권 2호선" -> "2", "인천 1호선" -> "인천 1", "신분당선" -> "신분당", "GTX-A" -> "GTX-A"
export const getSubwayLineShortName = (lineName: string) => {
  // "수도권 ", "서울 " 등 지역 접두사 제거
  const name = lineName.replace(/^(수도권|서울)\s*/, '').trim();

  const incheonLine = name.match(/^인천\s*(\d+)호선$/);
  if (incheonLine) {
    return `인천 ${incheonLine[1]}`;
  }

  const numberLine = name.match(/^(\d+)호선$/);
  if (numberLine) {
    return numberLine[1];
  }

  if (SUBWAY_LINE_LABEL_MAP[name]) {
    return SUBWAY_LINE_LABEL_MAP[name];
  }

  if (/^GTX/i.test(name)) {
    return name;
  }

  // 매핑에 없으면 잘라내지 않고 '선' 접미사만 제거해 그대로 노출한다.
  return name.replace(/선$/, '');
};

// 밝은 노선 색상(분당선 등) 위에는 어두운 텍스트를 쓴다
export const isLightColor = (colorHex: string) => {
  const hex = colorHex.replace('#', '');

  if (hex.length !== 6) {
    return false;
  }

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.64;
};
