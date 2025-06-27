import styled from '@emotion/styled';

const Container = styled.div<{ error?: boolean; readOnly?: boolean }>`
  min-height: 220px !important;
  max-height: 320px;
  overflow-y: auto;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-radius: 4px;

  ${({ readOnly, error, theme }) => {
    if (readOnly) {
      return `
        background-color: ${theme.palette.grey.g10};
        border: 1px solid ${theme.palette.grey.g20};
        color: ${theme.palette.grey.g40};
        pointer-events: none;
      `;
    }

    if (error) {
      return `
        border-color: ${theme.palette.status.error1};
      `;
    }
  }}

  #quill-editor {
    border: none;
    z-index: 1;
  }

  .ql-editor {
    user-select: text !important;
    -webkit-user-select: text !important;
    
    p,
    ul,
    ol,
    li,
    blockquote {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 28px;
    }

    blockquote {
      margin: 0;
      padding: 0 16px;
      border-left: 4px solid ${({ theme }) => theme.palette.grey.g20};
    }

    h1 {
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: 28px;
    }

    h2 {
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: 28px;
    }

    h3 {
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 28px;
    }

    ul {
      list-style-type: disc;
      padding-left: 24px;
    }

    ol {
      list-style-type: decimal;
      padding-left: 24px;
    }

    li {
      margin: 0;
      padding: 0;
    }
    
    a {
      color: #46a6ff;
      text-decoration-line: underline;
      text-decoration-style: solid;
      text-decoration-skip-ink: none;
      text-decoration-thickness: auto;
      text-underline-offset: auto;
      text-underline-position: from-font;
    }

    hr {
      border: none;
      border-top: 1px solid ${({ theme }) => theme.palette.grey.g20};
      margin: 16px 0;
    }

    strong {
      font-weight: 600;
    }

    em {
      font-style: italic;
    }

    u {
      text-decoration: underline;
    }
  }

  .ql-editor.ql-blank::before {
    ${({ theme }) => theme.typo.b3};
    color: ${({ theme }) => theme.palette.grey.g30};
    margin: 0;
  }

  .ql-toolbar.ql-snow {
    position: sticky;
    top: 0;
    z-index: 2;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g20};
    background-color: ${({ theme }) => theme.palette.grey.g10};
    display: flex;
    flex-wrap: wrap;
    gap: 8px 0;

  }

  .ql-toolbar.ql-snow .ql-formats {
    margin: 0;
    padding: 0 12px;
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 8px;

    &:first-of-type {
      padding-left: 0;
    }

    &:last-of-type {
      padding-right: 0;
    }

    &::after {
      content: '';
      display: inline-block;
      width: 1px;
      height: 16px;
      background-color: ${({ theme }) => theme.palette.grey.g30};
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }

    &:last-of-type::after {
      display: none;
    }
  }

  .ql-toolbar.ql-snow .ql-formats button {
    width: 22px;
    height: 22px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
  }

  .ql-picker.ql-header {
    width: 112px;
    height: 28px;
    display: inline-flex;
    align-items: center;
    border-radius: 6px;
    background-color: ${({ theme }) => theme.palette.grey.w};
    margin-right: 4px;
  }

  .ql-picker-label {
    width: 100%;
    display: inline-flex;
    align-items: center;
    padding: 0 8px;
    ${({ theme }) => theme.typo.b1};
    color: ${({ theme }) => theme.palette.grey.g90} !important;
  }

  .ql-picker-label.ql-active {
    color: ${({ theme }) => theme.palette.grey.g90} !important;
  }

  .ql-header .ql-picker-label {
    position: relative;
  }

  .ql-header .ql-picker-label svg {
    display: none !important;
  }

  .ql-header .ql-picker-label::after {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url('data:image/svg+xml;utf8,%3Csvg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"%3E %3Cpath d="M11.3333 6.66675L7.99998 10.6667L4.66665 6.66675L11.3333 6.66675Z" fill="%23282B33" stroke="%23282B33" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/%3E %3C/svg%3E') no-repeat center;
    background-size: contain;
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  .ql-picker.ql-expanded .ql-picker-label {
    border-color: transparent !important;
  }
`;

export default {
  Container,
};
