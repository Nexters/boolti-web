import ThemeProvider from '@boolti/ui/src/components/ThemeProvider';
import type { Decorator, Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
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
    <ThemeProvider>
      <Story {...context} />
    </ThemeProvider>
  ),
];

export default preview;
