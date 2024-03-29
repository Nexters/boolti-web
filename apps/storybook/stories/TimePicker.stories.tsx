import { TimePicker } from '@boolti/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TimePicker> = {
  title: '컴포넌트/타임피커',
  component: TimePicker,
};

type Story = StoryObj<typeof TimePicker>;

export const Default: Story = {
  args: {
    hour: 1,
    minute: 0,
  },
};

export default meta;
