import '@emotion/react';

import breakpoint from './systems/breakpoint';
import palette from './systems/palette';
import typo from './systems/typo';

declare module '@emotion/react' {
  export interface Theme {
    palette: typeof palette;
    typo: typeof typo;
    breakpoint: typeof breakpoint;
  }
}
