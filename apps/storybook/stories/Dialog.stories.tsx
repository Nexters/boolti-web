import { Dialog } from '@boolti/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Dialog> = {
  title: '컴포넌트/다이얼로그',
  component: Dialog,
  args: {
    open: true,
  },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  args: {
    title: '제목',
    children: '본문',
  },
};
