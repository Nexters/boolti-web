export type PhoneType =
  | 'mobile'
  | 'seoul'
  | 'region'
  | 'special'
  | 'voip'
  | 'legacyMobile'
  | 'unknown';

const SPECIAL_PREFIXES = ['15', '16', '18']; // 15xx, 16xx, 18xx
const REGION_PREFIXES = [
  '031',
  '032',
  '033',
  '041',
  '042',
  '043',
  '044',
  '051',
  '052',
  '053',
  '054',
  '055',
  '061',
  '062',
  '063',
  '064',
];
const LEGACY_MOBILE_PREFIXES = ['011', '016', '017', '018', '019'];

export const stripNonDigits = (value: string) => value.replace(/\D+/g, '');

export function detectPhoneType(digits: string): PhoneType {
  if (digits.startsWith('02')) return 'seoul';
  if (digits.startsWith('010')) return 'mobile';
  if (digits.startsWith('070')) return 'voip';
  if (REGION_PREFIXES.some((p) => digits.startsWith(p))) return 'region';
  if (LEGACY_MOBILE_PREFIXES.some((p) => digits.startsWith(p))) return 'legacyMobile';
  // 대표/특수번호: 15xx/16xx/18xx 로 시작, 총 8자리
  if (SPECIAL_PREFIXES.some((p) => digits.startsWith(p)) && digits.length <= 8) return 'special';
  return 'unknown';
}

export function getMaxLengthByType(type: PhoneType): number {
  switch (type) {
    case 'mobile':
    case 'voip':
      return 11; // 3-4-4
    case 'seoul':
      return 10; // 2-3/4-4 (최대 10)
    case 'region':
      return 11; // 3-3/4-4 (최대 11)
    case 'legacyMobile':
      return 11; // 3-3/4-4
    case 'special':
      return 8; // 4-4
    default:
      return 11; // 보수적 기본값
  }
}

export function formatPhoneDynamic(input: string): {
  formatted: string;
  type: PhoneType;
  maxLength: number;
} {
  const digits = stripNonDigits(input).slice(0, 12); // 방어적 컷(안전 여유)
  const type = detectPhoneType(digits);
  const maxLength = getMaxLengthByType(type);
  const clipped = digits.slice(0, maxLength);

  if (clipped.length === 0) return { formatted: '', type, maxLength };

  // 특수번호: 15xx/16xx/18xx → 4-4
  if (type === 'special') {
    if (clipped.length <= 4) return { formatted: clipped, type, maxLength };
    return { formatted: `${clipped.slice(0, 4)}-${clipped.slice(4, 8)}`.replace(/-$/, ''), type, maxLength };
  }

  // 서울(02): 2 - (3/4) - 4
  if (type === 'seoul') {
    const area = '02';
    const rest = clipped.slice(2);
    if (rest.length <= 3) return { formatted: `${area}-${rest}`.replace(/-$/, ''), type, maxLength };
    const mid = rest.length === 7 ? rest.slice(0, 3) : rest.slice(0, 4); // 총길이 9→중간3, 10→중간4
    const tail = rest.slice(mid.length, mid.length + 4);
    return { formatted: `${area}-${mid}-${tail}`.replace(/-+$/, ''), type, maxLength };
  }

  // 휴대폰/인터넷전화/지역/구형휴대폰 공통: prefix - mid - tail
  const prefixLength = (() => {
    if (type === 'mobile' || type === 'voip' || type === 'legacyMobile') return 3;
    if (type === 'region') return 3;
    // unknown 포함: 선행 3자리 기준으로 가정
    return 3;
  })();
  const area = clipped.slice(0, prefixLength);
  const rest = clipped.slice(prefixLength);

  // 마지막 4자리는 tail, 남은 것은 mid (가변)
  if (rest.length <= 4) return { formatted: `${area}-${rest}`.replace(/-$/, ''), type, maxLength };
  const tail = rest.slice(-4);
  const mid = rest.slice(0, rest.length - 4);
  return { formatted: `${area}-${mid}-${tail}`.replace(/-+$/, ''), type, maxLength };
}

export function validatePhoneOnBlur(input: string): boolean {
  const digits = stripNonDigits(input);
  const type = detectPhoneType(digits);
  const max = getMaxLengthByType(type);
  if (type === 'unknown') return false;
  return digits.length === max;
}
