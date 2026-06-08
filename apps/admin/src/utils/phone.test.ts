import { describe, expect, it } from 'vitest';

import {
  detectPhoneType,
  formatPhoneDynamic,
  getLengthRangeByType,
  stripNonDigits,
  validatePhoneOnBlur,
} from './phone';

describe('stripNonDigits', () => {
  it('숫자가 아닌 문자를 제거한다', () => {
    expect(stripNonDigits('010-1234-5678')).toBe('01012345678');
  });

  it('빈 문자열이면 빈 문자열을 반환한다', () => {
    expect(stripNonDigits('')).toBe('');
  });
});

describe('detectPhoneType', () => {
  it('전화번호 접두사로 타입을 판별한다', () => {
    expect(detectPhoneType('0212345678')).toBe('seoul');
    expect(detectPhoneType('01012345678')).toBe('mobile');
    expect(detectPhoneType('07012345678')).toBe('voip');
    expect(detectPhoneType('0311234567')).toBe('region');
    expect(detectPhoneType('0161234567')).toBe('legacyMobile');
    expect(detectPhoneType('15881234')).toBe('special');
  });

  it('지원하지 않는 접두사면 unknown을 반환한다', () => {
    expect(detectPhoneType('99912345678')).toBe('unknown');
  });
});

describe('getLengthRangeByType', () => {
  it('타입별 길이 범위를 반환한다', () => {
    expect(getLengthRangeByType('seoul')).toEqual({ min: 9, max: 10 });
    expect(getLengthRangeByType('mobile')).toEqual({ min: 11, max: 11 });
    expect(getLengthRangeByType('special')).toEqual({ min: 8, max: 8 });
  });
});

describe('formatPhoneDynamic', () => {
  it('빈 입력이면 빈 formatted를 반환한다', () => {
    expect(formatPhoneDynamic('')).toEqual({
      formatted: '',
      type: 'unknown',
      maxLength: 11,
    });
  });

  it('서울 지역번호를 포맷한다', () => {
    expect(formatPhoneDynamic('0212345678')).toEqual({
      formatted: '02-1234-5678',
      type: 'seoul',
      maxLength: 10,
    });
  });

  it('서울 9자리 번호를 포맷한다', () => {
    expect(formatPhoneDynamic('021234567')).toEqual({
      formatted: '02-123-4567',
      type: 'seoul',
      maxLength: 10,
    });
  });

  it('휴대폰 번호를 포맷한다', () => {
    expect(formatPhoneDynamic('01012345678')).toEqual({
      formatted: '010-1234-5678',
      type: 'mobile',
      maxLength: 11,
    });
  });

  it('대표번호를 포맷한다', () => {
    expect(formatPhoneDynamic('15881234')).toEqual({
      formatted: '1588-1234',
      type: 'special',
      maxLength: 8,
    });
  });

  it('지원하지 않는 번호는 unknown 타입으로 3-중간-4 형식에 맞춰 포맷한다', () => {
    expect(formatPhoneDynamic('12345678901')).toEqual({
      formatted: '123-4567-8901',
      type: 'unknown',
      maxLength: 11,
    });
  });
});

describe('validatePhoneOnBlur', () => {
  it('유효한 번호면 true를 반환한다', () => {
    expect(validatePhoneOnBlur('010-1234-5678')).toBe(true);
    expect(validatePhoneOnBlur('02-1234-5678')).toBe(true);
    expect(validatePhoneOnBlur('1588-1234')).toBe(true);
  });

  it('유효하지 않거나 알 수 없는 번호면 false를 반환한다', () => {
    expect(validatePhoneOnBlur('0101234')).toBe(false);
    expect(validatePhoneOnBlur('99912345678')).toBe(false);
  });

  it('서울 번호 길이 경계(9자리/10자리)를 허용한다', () => {
    expect(validatePhoneOnBlur('021234567')).toBe(true);
    expect(validatePhoneOnBlur('0212345678')).toBe(true);
  });

  it('대표번호는 8자리만 허용한다', () => {
    expect(validatePhoneOnBlur('15881234')).toBe(true);
    expect(validatePhoneOnBlur('1588123')).toBe(false);
    expect(validatePhoneOnBlur('158812345')).toBe(false);
  });
});
