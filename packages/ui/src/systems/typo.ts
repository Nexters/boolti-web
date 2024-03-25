import { css } from '@emotion/react';

const generateTypo = (size: number, weight: number, lineHeight: number) => css`
  font-family:
    'Pretendard Variable',
    Pretendard,
    -apple-system,
    BlinkMacSystemFont,
    system-ui,
    Roboto,
    'Helvetica Neue',
    'Segoe UI',
    'Apple SD Gothic Neo',
    'Noto Sans KR',
    'Malgun Gothic',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    sans-serif;
  font-style: normal;
  line-height: ${lineHeight}px;
  font-display: auto;
  font-weight: ${weight};
  font-size: ${size}px;
`;

const generatePointTypo = (size: number, weight: number, lineHeight: number) => css`
  font-family:
    'SB Aggro',
    -apple-system,
    BlinkMacSystemFont,
    system-ui,
    Roboto,
    'Helvetica Neue',
    'Segoe UI',
    'Apple SD Gothic Neo',
    'Noto Sans KR',
    'Malgun Gothic',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    sans-serif;
  font-style: normal;
  line-height: ${lineHeight}px;
  font-display: auto;
  font-weight: ${weight};
  font-size: ${size}px;
  letter-spacing: -0.72px;
`;

const typo = {
  h3: generateTypo(28, 600, 40),
  h2: generateTypo(24, 600, 32),
  h2_m: generateTypo(24, 400, 32),
  h1: generateTypo(20, 600, 28),
  sh2: generateTypo(18, 600, 26),
  sh1: generateTypo(16, 600, 22),
  b4: generateTypo(18, 400, 26),
  b3: generateTypo(16, 400, 22),
  b2: generateTypo(15, 400, 21),
  b1: generateTypo(14, 400, 22),
  c1: generateTypo(12, 400, 18),
  point: {
    p4: generatePointTypo(24, 400, 34),
    p3: generatePointTypo(24, 400, 34),
    p2: generatePointTypo(20, 400, 30),
    p1: generatePointTypo(16, 400, 26),
  },
} as const;

export default typo;
