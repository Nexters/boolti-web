import styled from '@emotion/styled'

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
    background-color: ${({ theme }) => theme.palette.grey.w};
  }
`

export default {
  Container
}
