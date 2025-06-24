import Quill from 'quill';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const icons = Quill.import('ui/icons') as Record<string, any>;

icons['header'] = ''

icons['bold'] = `
<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 11H13.75C14.7225 11 15.6551 11.3863 16.3427 12.0739C17.0304 12.7615 17.4167 13.6942 17.4167 14.6666C17.4167 15.6391 17.0304 16.5717 16.3427 17.2594C15.6551 17.947 14.7225 18.3333 13.75 18.3333H6.41667C6.17355 18.3333 5.94039 18.2367 5.76849 18.0648C5.59658 17.8929 5.5 17.6597 5.5 17.4166V4.58329C5.5 4.34018 5.59658 4.10702 5.76849 3.93511C5.94039 3.7632 6.17355 3.66663 6.41667 3.66663H12.8333C13.8058 3.66663 14.7384 4.05293 15.4261 4.74057C16.1137 5.4282 16.5 6.36083 16.5 7.33329C16.5 8.30575 16.1137 9.23838 15.4261 9.92602C14.7384 10.6137 13.8058 11 12.8333 11" stroke="#282B33" stroke-width="2.52083" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

icons['italic'] = `
<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.4166 3.66663H9.16663" stroke="#282B33" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.8333 18.3334H4.58328" stroke="#282B33" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.75 3.66663L8.24997 18.3333" stroke="#282B33" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

icons['underline'] = `
<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.50003 3.66663V9.16663C5.50003 10.6253 6.07949 12.0243 7.11094 13.0557C8.14239 14.0872 9.54134 14.6666 11 14.6666C12.4587 14.6666 13.8577 14.0872 14.8891 13.0557C15.9206 12.0243 16.5 10.6253 16.5 9.16663V3.66663" stroke="#282B33" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.66672 18.3334H18.3334" stroke="#282B33" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

icons['list']['ordered'] = `
<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.16669 11H19.25" stroke="#282B33" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.16669 16.5H19.25" stroke="#282B33" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.16669 5.5H19.25" stroke="#282B33" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.66669 9.16663H5.50002" stroke="#282B33" stroke-width="1.5125" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.66669 5.5H4.58335V9.16667" stroke="#282B33" stroke-width="1.5125" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.50002 16.5H3.66669C3.66669 15.5834 5.50002 14.6667 5.50002 13.75C5.50002 12.8334 4.58335 12.375 3.66669 12.8334" stroke="#282B33" stroke-width="1.5125" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

icons['list']['bullet'] = `
<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.75 11H2.76" stroke="#282B33" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.75 16.5H2.76" stroke="#282B33" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.75 5.5H2.76" stroke="#282B33" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.33331 11H19.25" stroke="#282B33" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.33331 16.5H19.25" stroke="#282B33" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.33331 5.5H19.25" stroke="#282B33" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

icons['blockquote'] = `
<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.5833 5.5H2.74994" stroke="#282B33" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.25 11H7.33331" stroke="#282B33" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.25 16.5H7.33331" stroke="#282B33" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.74994 11V16.5" stroke="#282B33" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

icons['link'] = `
<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.25004 15.5833H6.41671C5.20113 15.5833 4.03534 15.1004 3.1758 14.2409C2.31626 13.3813 1.83337 12.2155 1.83337 11C1.83337 9.78438 2.31626 8.6186 3.1758 7.75905C4.03534 6.89951 5.20113 6.41663 6.41671 6.41663H8.25004" stroke="#282B33" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.7501 6.41663H15.5834C16.799 6.41663 17.9648 6.89951 18.8243 7.75905C19.6838 8.6186 20.1667 9.78438 20.1667 11C20.1667 12.2155 19.6838 13.3813 18.8243 14.2409C17.9648 15.1004 16.799 15.5833 15.5834 15.5833H13.7501" stroke="#282B33" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.33337 11H14.6667" stroke="#282B33" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

icons['image'] = `
<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.4166 2.75H4.58327C3.57075 2.75 2.74994 3.57081 2.74994 4.58333V17.4167C2.74994 18.4292 3.57075 19.25 4.58327 19.25H17.4166C18.4291 19.25 19.2499 18.4292 19.2499 17.4167V4.58333C19.2499 3.57081 18.4291 2.75 17.4166 2.75Z" stroke="#282B33" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.24996 10.0833C9.26248 10.0833 10.0833 9.26248 10.0833 8.24996C10.0833 7.23744 9.26248 6.41663 8.24996 6.41663C7.23744 6.41663 6.41663 7.23744 6.41663 8.24996C6.41663 9.26248 7.23744 10.0833 8.24996 10.0833Z" stroke="#282B33" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.2499 13.7499L16.4211 10.9211C16.0773 10.5774 15.6111 10.3843 15.1249 10.3843C14.6388 10.3843 14.1726 10.5774 13.8288 10.9211L5.49994 19.2499" stroke="#282B33" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

icons['video'] = `
<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_19027_11511)">
<path d="M8.71201 17.0046C6.70111 16.9386 4.69347 16.7407 2.70212 16.4107C2.39143 16.3255 2.10826 16.1609 1.88047 15.9331C1.65267 15.7054 1.48809 15.4222 1.4029 15.1115C0.754615 12.0521 0.754615 8.89076 1.4029 5.83135C1.48809 5.52066 1.65267 5.23749 1.88047 5.00969C2.10826 4.78189 2.39143 4.61731 2.70212 4.53213C7.67948 3.70755 12.7586 3.70755 17.736 4.53213C18.0466 4.61731 18.3298 4.78189 18.5576 5.00969C18.7854 5.23749 18.95 5.52066 19.0352 5.83135C19.3679 7.40171 19.5299 8.99891 19.521 10.5954" stroke="#282B33" stroke-width="1.60417" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.36414 13.2541L13.0042 10.4701L8.36414 7.68604V13.2541Z" fill="#282B33" stroke="#282B33" stroke-width="0.556809" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.248 18.0962L17.8651 16.5825" stroke="#282B33" stroke-width="1.42083" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.0358 14.1754L17.5241 13.8935C18.6801 13.2261 20.1582 13.6221 20.8256 14.7781V14.7781C21.4929 15.934 21.0969 17.4121 19.9409 18.0795L19.4526 18.3615" stroke="#282B33" stroke-width="1.5125" stroke-linecap="round"/>
<path d="M13.558 16.1843L13.0696 16.4663C11.9137 17.1337 11.5176 18.6118 12.185 19.7677V19.7677C12.8524 20.9237 14.3305 21.3197 15.4864 20.6523L15.9748 20.3704" stroke="#282B33" stroke-width="1.5125" stroke-linecap="round"/>
</g>
<defs>
<clipPath id="clip0_19027_11511">
<rect width="22" height="22" fill="white"/>
</clipPath>
</defs>
</svg>
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BlockEmbed = Quill.import('blots/block/embed') as any;

class YoutubeVideoBlot extends BlockEmbed {
  static create(value: string) {
    const node = super.create();
    node.setAttribute('src', value);
    node.setAttribute('frameborder', '0');
    node.setAttribute(
      'allow',
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
    );
    node.setAttribute('width', '100%');
    node.setAttribute('style', 'aspect-ratio: 16 / 9;');
    node.setAttribute('title', 'YouTube video player');

    return node;
  }
  static value(node: HTMLElement) {
    return node.getAttribute('src');
  }
}
YoutubeVideoBlot.blotName = 'video';
YoutubeVideoBlot.tagName = 'iframe';

Quill.register(YoutubeVideoBlot, true);
