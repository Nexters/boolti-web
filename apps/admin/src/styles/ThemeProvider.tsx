import { ThemeProvider as BaseThemeProvider } from '@emotion/react';

import palette from './palette';
import typo from './typo';

const theme = {
  palette,
  typo,
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => (
  <BaseThemeProvider theme={theme}>{children}</BaseThemeProvider>
);

export default ThemeProvider;
