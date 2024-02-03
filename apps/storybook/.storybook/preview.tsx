import '../styles/index.css';
import 'the-new-css-reset/css/reset.css';

import { themes } from '@storybook/theming';
import { BooltiUIProvider } from '@boolti/ui';
import type { Decorator, Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    darkMode: {
      dark: undefined,
      light: themes.normal,
      stylePreview: true,
      current: 'light'
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};


export const decorators: Decorator[] = [
  (Story, context) => (
    <BooltiUIProvider>
      <Story {...context} />
    </BooltiUIProvider>
  ),
];

export default preview;
