import { describe, expect, it } from 'vitest';

import { boldText } from './boldText';

describe('boldText', () => {
  it('키워드가 없으면 원본 문자열을 반환한다', () => {
    expect(boldText('불티 관리자', '')).toBe('불티 관리자');
  });

  it('키워드와 일치하는 텍스트를 strong 태그로 감싼다', () => {
    expect(boldText('01012341234', '1234')).toBe('010<strong>1234</strong><strong>1234</strong>');
  });

  it('정규식 특수문자가 포함된 키워드도 안전하게 처리한다', () => {
    expect(boldText('a+b+c', 'a+b')).toBe('<strong>a+b</strong>+c');
  });

  it('일치하는 키워드가 없으면 원본 문자열을 반환한다', () => {
    expect(boldText('boolti admin', 'hello')).toBe('boolti admin');
  });
});
