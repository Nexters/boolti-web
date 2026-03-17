import { Badge } from '@boolti/ui';
import type { Meta, StoryObj } from '@storybook/react';

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
    children: '홍보 중',
  },
};

export const Green: Story = {
  args: {
    colorTheme: 'green',
    children: '판매 중',
  },
};

export const Red: Story = {
  args: {
    colorTheme: 'red',
    children: '판매 종료',
  },
};

export const Orange: Story = {
  args: {
    colorTheme: 'orange',
    children: '공연일',
  },
};

export const Grey: Story = {
  args: {
    colorTheme: 'grey',
    children: '공연 종료',
  },
};
