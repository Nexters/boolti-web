import '@emotion/react';

import palette from './systems/palette';
import typo from './systems/typo';
import breakpoint from './systems/breakpoint';

declare module '@emotion/react' {
  export interface Theme {
    palette: typeof palette;
    typo: typeof typo;
    breakpoint: typeof breakpoint;
  }
}
