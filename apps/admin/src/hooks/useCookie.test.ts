// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';

import useCookie from './useCookie';

describe('useCookie', () => {
  it('setCookie는 쿠키를 인코딩하여 저장한다', () => {
    const { setCookie } = useCookie();

    setCookie('popup', '한글 값');

    expect(document.cookie).toContain('popup=');
    expect(document.cookie).toContain(encodeURIComponent('한글 값'));
  });

  it('getCookie는 저장된 쿠키를 디코딩해 반환한다', () => {
    const { setCookie, getCookie } = useCookie();

    setCookie('token', 'abc 123');
    expect(getCookie('token')).toBe('abc 123');
  });

  it('deleteCookie는 max-age=-1로 만료시킨다', () => {
    const { setCookie, getCookie, deleteCookie } = useCookie();

    setCookie('remove-me', 'value');
    expect(getCookie('remove-me')).toBe('value');

    deleteCookie('remove-me');
    expect(getCookie('remove-me')).toBeNull();
  });
});
