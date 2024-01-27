import { ThemeProvider as BaseThemeProvider } from '@emotion/react';

import palette from '../../systems/palette';
import typo from '../../systems/typo';
import breakpoint from '../../systems/breakpoint';

const theme = {
  palette,
  typo,
  breakpoint,
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => (
  <BaseThemeProvider theme={theme}>{children}</BaseThemeProvider>
);

export default ThemeProvider;
