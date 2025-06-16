import styled from '@emotion/styled';

const Content = styled.div`
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

  strong {
    font-weight: 600;
  }

  em {
    font-style: italic;
  }

  u {
    text-decoration: underline;
  }
`

export default {
  Content,
}
