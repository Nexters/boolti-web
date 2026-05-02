import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { highlightText } from './highlight';

const Highlight = ({ children }: { children: React.ReactNode }) => <mark>{children}</mark>;

describe('highlightText', () => {
  it('검색어가 비어 있으면 원본 텍스트를 반환한다', () => {
    const result = highlightText('Boolti Admin', '   ', Highlight);
    expect(result).toBe('Boolti Admin');
  });

  it('대소문자를 무시하고 일치하는 부분을 하이라이트한다', () => {
    const result = highlightText('Boolti Admin BOOLTI', 'boolti', Highlight);
    const html = renderToStaticMarkup(<>{result}</>);

    expect(html).toBe('<mark>Boolti</mark> Admin <mark>BOOLTI</mark>');
  });

  it('정규식 특수문자가 포함된 검색어를 안전하게 처리한다', () => {
    const result = highlightText('a+b a+b', 'a+b', Highlight);
    const html = renderToStaticMarkup(<>{result}</>);

    expect(html).toBe('<mark>a+b</mark> <mark>a+b</mark>');
  });

  it('일치하는 검색어가 없으면 원본 텍스트를 유지한다', () => {
    const result = highlightText('Boolti Admin', 'hello', Highlight);
    const html = renderToStaticMarkup(<>{result}</>);

    expect(html).toBe('Boolti Admin');
  });

  it('한글 검색어도 하이라이트한다', () => {
    const result = highlightText('불티 관리자 불티', '불티', Highlight);
    const html = renderToStaticMarkup(<>{result}</>);

    expect(html).toBe('<mark>불티</mark> 관리자 <mark>불티</mark>');
  });
});
