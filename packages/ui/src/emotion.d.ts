import '@emotion/react';

import palette from './palette';
import typo from './typo';

declare module '@emotion/react' {
  export interface Theme {
    palette: typeof palette;
    typo: typeof typo;
  }
}
