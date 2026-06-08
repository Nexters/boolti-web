import { describe, expect, it } from 'vitest';

import { formatPhoneNumber } from './format';

describe('formatPhoneNumber', () => {
  it('+82 국제번호 형식을 포맷한다', () => {
    expect(formatPhoneNumber('821012341234')).toBe('+82-10-1234-1234');
    expect(formatPhoneNumber('82212345678')).toBe('+82-2-1234-5678');
  });

  it('대표번호(15xx) 형식을 포맷한다', () => {
    expect(formatPhoneNumber('15881234')).toBe('1588-1234');
  });

  it('국내 전화번호 형식을 포맷한다', () => {
    expect(formatPhoneNumber('0212345678')).toBe('02-1234-5678');
    expect(formatPhoneNumber('01012341234')).toBe('010-1234-1234');
    expect(formatPhoneNumber('0311234567')).toBe('031-123-4567');
  });

  it('0504, 0505 번호를 포맷한다', () => {
    expect(formatPhoneNumber('050512341234')).toBe('0505-1234-1234');
    expect(formatPhoneNumber('050412345678')).toBe('0504-1234-5678');
  });

  it('이미 하이픈이 포함된 값은 원본 문자열을 유지한다', () => {
    expect(formatPhoneNumber('010-1234-5678')).toBe('010-1234-5678');
  });

  it('짧은 입력도 가능한 형태로 안전하게 포맷한다', () => {
    expect(formatPhoneNumber('0101234')).toBe('010-1234');
  });
});
