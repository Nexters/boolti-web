import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from '@boolti/ui';

const meta: Meta<typeof Badge> = {
  title: '컴포넌트/뱃지',
  component: Badge,
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Purple: Story = {
  args: {
    colorTheme: 'purple',
    children: '티켓 판매 오픈 D-n',
  },
};

export const Blue: Story = {
  args: {
    colorTheme: 'blue',
    children: '티켓 판매 중',
  },
};

export const Green: Story = {
  args: {
    colorTheme: 'green',
    children: '티켓 판매 종료',
  },
};

export const Red: Story = {
  args: {
    colorTheme: 'red',
    children: '공연 당일',
  },
};

export const Grey: Story = {
  args: {
    colorTheme: 'grey',
    children: '공연 종료',
  },
};
