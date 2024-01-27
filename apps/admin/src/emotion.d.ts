import '@emotion/react';

import { palette, typo } from '@boolti/ui';

declare module '@emotion/react' {
  export interface Theme {
    palette: typeof palette;
    typo: typeof typo;
  }
}
