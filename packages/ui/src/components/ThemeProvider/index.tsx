import { ThemeProvider as BaseThemeProvider } from '@emotion/react';

import breakpoint from '../../systems/breakpoint';
import palette from '../../systems/palette';
import typo from '../../systems/typo';
import Toast from '../Toast';

const theme = {
  palette,
  typo,
  breakpoint,
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => (
  <BaseThemeProvider theme={theme}>
    {children}
    <Toast />
  </BaseThemeProvider>
);

export default ThemeProvider;
