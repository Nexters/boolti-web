import DOMPurify from 'dompurify';

const ALLOWED_TAGS = [
  'a',
  'blockquote',
  'br',
  'em',
  'h1',
  'h2',
  'h3',
  'iframe',
  'img',
  'li',
  'ol',
  'p',
  'span',
  'strong',
  'u',
  'ul',
];

const ALLOWED_ATTR = [
  'allow',
  'alt',
  'class',
  'contenteditable',
  'data-list',
  'frameborder',
  'href',
  'rel',
  'src',
  'target',
  'title',
  'width',
];

const YOUTUBE_EMBED_HOSTS = new Set(['www.youtube.com', 'www.youtube-nocookie.com']);

const removeDangerousTextPatterns = (text: string) =>
  text
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/giu, '')
    .replace(/<\/?script\b[^>]*>/giu, '')
    .replace(/\bon[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/giu, '')
    .replace(/\b(?:href\s*=\s*(?:"|')?)?javascript\s*:[^\s<"']*/giu, '')
    .replace(/<\?php/giu, '');

const isYoutubeEmbedUrl = (value: string) => {
  try {
    const url = new URL(value);

    return (
      url.protocol === 'https:' &&
      YOUTUBE_EMBED_HOSTS.has(url.hostname) &&
      url.pathname.startsWith('/embed/')
    );
  } catch {
    return false;
  }
};

export const sanitizeShowNotice = (notice: string) => {
  const sanitized = DOMPurify.sanitize(notice, {
    ALLOWED_ATTR,
    ALLOWED_TAGS,
    ALLOW_DATA_ATTR: false,
  });
  const template = document.createElement('template');
  template.innerHTML = sanitized;

  const textNodes = document.createTreeWalker(template.content, NodeFilter.SHOW_TEXT);
  let textNode = textNodes.nextNode();

  while (textNode) {
    textNode.textContent = removeDangerousTextPatterns(textNode.textContent ?? '');
    textNode = textNodes.nextNode();
  }

  template.content.querySelectorAll('*').forEach((element) => {
    Array.from(element.attributes).forEach((attribute) => {
      element.setAttribute(attribute.name, removeDangerousTextPatterns(attribute.value));
    });
  });

  template.content.querySelectorAll('iframe').forEach((iframe) => {
    const src = iframe.getAttribute('src');

    if (!src || !isYoutubeEmbedUrl(src)) {
      iframe.remove();
      return;
    }

    iframe.setAttribute('style', 'aspect-ratio: 16 / 9;');
  });

  return template.innerHTML;
};
