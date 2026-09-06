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
