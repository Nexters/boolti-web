import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@boolti/ui';

const meta: Meta<typeof Button> = {
  title: '버튼',
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    colorTheme: 'primary',
    size: 'bold',
    children: 'BUTTON',
  },
};
