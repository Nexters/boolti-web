import { describe, expect, it } from 'vitest';

import { replaceUserCode } from './replace';

describe('replaceUserCode', () => {
  it('허용된 문자만 유지한다', () => {
    expect(replaceUserCode('Abc_123')).toBe('Abc_123');
  });

  it('허용되지 않은 문자를 제거한다', () => {
    expect(replaceUserCode('A!b@c#한글-123')).toBe('Abc123');
  });

  it('결과 길이를 20자로 제한한다', () => {
    expect(replaceUserCode('abcdefghijklmnopqrstuvwxyz_0123')).toBe(
      'abcdefghijklmnopqrst',
    );
  });

  it('길이가 정확히 20자면 그대로 유지한다', () => {
    expect(replaceUserCode('abcdefghijklmnopqrst')).toBe('abcdefghijklmnopqrst');
  });

  it('빈 문자열이면 빈 문자열을 반환한다', () => {
    expect(replaceUserCode('')).toBe('');
  });

  it('언더스코어와 숫자 조합을 유지한다', () => {
    expect(replaceUserCode('__user_001__')).toBe('__user_001__');
  });
});
