import type { Meta, StoryObj } from '@storybook/react';

import { GithubIcon } from '@boolti/icon';
import { Button } from '@boolti/ui';

const meta: Meta<typeof Button> = {
  title: '컴포넌트/버튼',
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

export const Netural: Story = {
  args: {
    colorTheme: 'netural',
    size: 'bold',
    children: 'BUTTON',
  },
};

export const Line: Story = {
  args: {
    colorTheme: 'line',
    size: 'bold',
    children: 'BUTTON',
  },
};

export const Icon: Story = {
  args: {
    colorTheme: 'primary',
    size: 'bold',
    children: 'BUTTON',
    icon: <GithubIcon />,
  },
};

export const Disabled: Story = {
  args: {
    colorTheme: 'primary',
    size: 'bold',
    children: 'BUTTON',
    disabled: true,
  },
};
