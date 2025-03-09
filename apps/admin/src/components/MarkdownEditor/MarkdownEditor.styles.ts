import styled from '@emotion/styled';

const MarkdownEditorContainer = styled.div<{ disabled?: boolean; hasError?: boolean }>`
  .mdx-editor {
    min-height: 220px;
    max-height: 440px;
    overflow-y: auto;
    border: 1px solid ${({ theme }) => theme.palette.grey.g20};
    border-radius: 4px;

    ${({ disabled, hasError, theme }) => {
    if (disabled) {
      return `
        background-color: ${theme.palette.grey.g10};
        border: 1px solid ${theme.palette.grey.g20};
        color: ${theme.palette.grey.g40};
        pointer-events: none;
      `;
    }

    if (hasError) {
      return `
        border-color: ${theme.palette.status.error1};
      `;
    }
  }}
  }

  .mdxeditor-toolbar {
    border-radius: 0;
  }

  .prose {
    p, ul, ol, li, blockquote {
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
      line-height: 26px;
    }

    h3 {
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px;
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
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 28px;
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
  }
`;

const YoutubeEmbedDeleteButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;

  &:hover {
    path {
      stroke: ${({ theme }) => theme.palette.grey.g90};
    }
  }

  svg {
    width: 20px;
    height: 20px;
  }

  path { 
    stroke: ${({ theme }) => theme.palette.grey.g20};
  }
`;

const YoutubeEmbedContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px 0 0;

  &:hover {
    ${YoutubeEmbedDeleteButton} {
      display: flex;
    }
  }
`;

export default {
  MarkdownEditorContainer,
  YoutubeEmbedDeleteButton,
  YoutubeEmbedContainer,
}
