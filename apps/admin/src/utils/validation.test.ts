import { describe, expect, it } from 'vitest';

import { validateAccountHolder, validateAccountNumber } from './validation';

describe('validateAccountNumber', () => {
  it('계좌번호 길이가 정확히 11이면 true를 반환한다', () => {
    expect(validateAccountNumber('12345678901')).toBe(true);
  });

  it('계좌번호 길이가 정확히 14이면 true를 반환한다', () => {
    expect(validateAccountNumber('12345678901234')).toBe(true);
  });

  it('계좌번호 길이가 11 미만이면 false를 반환한다', () => {
    expect(validateAccountNumber('1234567890')).toBe(false);
  });

  it('계좌번호 길이가 11 이상 14 이하이면 true를 반환한다', () => {
    expect(validateAccountNumber('12345678901')).toBe(true);
    expect(validateAccountNumber('12345678901234')).toBe(true);
  });

  it('계좌번호 길이가 14 초과이면 false를 반환한다', () => {
    expect(validateAccountNumber('123456789012345')).toBe(false);
  });

  it('빈 문자열이면 false를 반환한다', () => {
    expect(validateAccountNumber('')).toBe(false);
  });
});

describe('validateAccountHolder', () => {
  it('예금주명이 한글이면 true를 반환한다', () => {
    expect(validateAccountHolder('홍길동')).toBe(true);
  });

  it('예금주명에 한글 이외 문자가 포함되면 false를 반환한다', () => {
    expect(validateAccountHolder('John')).toBe(false);
    expect(validateAccountHolder('홍길동1')).toBe(false);
    expect(validateAccountHolder('홍 길동')).toBe(false);
  });

  it('자모만 입력된 경우 true를 반환한다', () => {
    expect(validateAccountHolder('ㄱㄴㄷ')).toBe(true);
  });

  it('앞뒤 공백이 포함되면 false를 반환한다', () => {
    expect(validateAccountHolder(' 홍길동')).toBe(false);
    expect(validateAccountHolder('홍길동 ')).toBe(false);
  });
});
