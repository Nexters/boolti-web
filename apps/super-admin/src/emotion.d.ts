import '@emotion/react';

import { breakpoint, palette, typo } from '@boolti/ui';

declare module '@emotion/react' {
  export interface Theme {
    palette: typeof palette;
    typo: typeof typo;
    breakpoint: typeof breakpoint;
  }
}
