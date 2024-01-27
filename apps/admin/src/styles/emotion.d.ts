import '@emotion/react';

import palette from './palette';
import typo from './typo';
import breakpoint from './breakpoint';

declare module '@emotion/react' {
  export interface Theme {
    palette: typeof palette;
    typo: typeof typo;
    breakpoint: typeof breakpoint;
  }
}
