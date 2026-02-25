import { NewBadge } from '@boolti/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof NewBadge> = {
  title: '컴포넌트/새뱃지',
  component: NewBadge,
};

export default meta;

type Story = StoryObj<typeof NewBadge>;

export const Green: Story = {
  args: {
    colorTheme: 'green',
    children: '판매 운영',
  },
};

export const Red: Story = {
  args: {
    colorTheme: 'red',
    children: '판매 중단',
  },
};

export const Grey: Story = {
  args: {
    colorTheme: 'grey',
    children: '판매 종료',
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', gap: '16px' }}>
        <NewBadge colorTheme="green">판매 운영</NewBadge>
        <NewBadge colorTheme="red">판매 중단</NewBadge>
        <NewBadge colorTheme="grey">판매 종료</NewBadge>
      </div>
      <div style={{ display: 'flex', gap: '16px' }}>
        <NewBadge colorTheme="green">운영</NewBadge>
        <NewBadge colorTheme="red">중단</NewBadge>
        <NewBadge colorTheme="grey">종료</NewBadge>
      </div>
    </div>
  ),
};
