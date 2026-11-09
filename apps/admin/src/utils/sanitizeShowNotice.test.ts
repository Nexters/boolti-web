// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';

import { sanitizeShowNotice } from './sanitizeShowNotice';

describe('sanitizeShowNotice', () => {
  it('Quill 서식과 WAF에서 허용되는 일반 텍스트를 유지한다', () => {
    const notice = [
      '<h2>공연 안내 ★</h2>',
      "<p><strong>Rock'n'Roll</strong> ${price} $() `code` | {price}</p>",
      '<p>import(수입) 음반과 alert 공지</p>',
      '<a href="https://www.youtube.com/watch?v=abc123&list=playlist">링크</a>',
      '<iframe src="https://www.youtube.com/embed/abc123" frameborder="0" allow="autoplay" width="100%" style="aspect-ratio: 16 / 9;" title="YouTube video player"></iframe>',
    ].join('');

    const sanitized = sanitizeShowNotice(notice);

    expect(sanitized).toContain('<h2>공연 안내 ★</h2>');
    expect(sanitized).toContain("Rock'n'Roll");
    expect(sanitized).toContain('${price} $() `code` | {price}');
    expect(sanitized).toContain('import(수입) 음반과 alert 공지');
    expect(sanitized).toContain('https://www.youtube.com/watch?v=abc123&amp;list=playlist');
    expect(sanitized).toContain('https://www.youtube.com/embed/abc123');
    expect(sanitized).toContain('aspect-ratio: 16 / 9;');
  });

  it('실행 가능한 HTML과 WAF 차단 대상인 위험 텍스트를 제거한다', () => {
    const notice = [
      '<script>alert(1)</script>',
      '<p onclick="alert(2)">안내</p>',
      '<img src="https://example.com/poster.png" alt="&lt;?php onerror=&quot;alert(8)&quot;" onerror="alert(3)">',
      '<a href="javascript:alert(4)">위험 링크</a>',
      '<p>&lt;script&gt;alert(5)&lt;/script&gt;</p>',
      '<p>onerror="alert(6)" javascript:alert(7) &lt;?php echo 1;</p>',
      '<iframe src="https://example.com/embed/unsafe"></iframe>',
    ].join('');

    const sanitized = sanitizeShowNotice(notice);

    expect(sanitized).not.toMatch(/<script|onclick=|onerror=|javascript:|<\?php/i);
    expect(sanitized).not.toContain('alert(1)');
    expect(sanitized).not.toContain('alert(5)');
    expect(sanitized).not.toContain('alert(8)');
    expect(sanitized).not.toContain('example.com/embed/unsafe');
    expect(sanitized).toContain('<p>안내</p>');
    expect(sanitized).toContain('https://example.com/poster.png');
  });
});
