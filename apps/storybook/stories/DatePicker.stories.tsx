import { DatePicker } from '@boolti/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof DatePicker> = {
  title: '컴포넌트/데이트피커',
  component: DatePicker,
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const small: Story = {
  args: { size: 'small' },
};

export const big: Story = {
  args: { size: 'big' },
};
