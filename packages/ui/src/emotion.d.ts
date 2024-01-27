import '@emotion/react';

import palette from './systems/palette';
import typo from './systems.typo';

declare module '@emotion/react' {
  export interface Theme {
    palette: typeof palette;
    typo: typeof typo;
  }
}
