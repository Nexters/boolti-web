import type { Meta, StoryObj } from '@storybook/react';

import { Confirm } from '@boolti/ui';

const meta: Meta<typeof Confirm> = {
  title: '컴포넌트/컨펌',
  component: Confirm,
};

export default meta;

type Story = StoryObj<typeof Confirm>;

export const Default: Story = {
  args: {
    children: '메세지',
  },
};
