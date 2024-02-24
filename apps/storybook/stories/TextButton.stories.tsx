import { GithubIcon } from '@boolti/icon';
import { TextButton } from '@boolti/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TextButton> = {
  title: '컴포넌트/텍스트버튼',
  component: TextButton,
  args: {
    children: 'TEXT BUTTON',
  },
};

export default meta;

type Story = StoryObj<typeof TextButton>;

export const Default: Story = {
  args: {
    colorTheme: 'netural',
    size: 'regular',
  },
};

export const Icon: Story = {
  args: {
    colorTheme: 'netural',
    size: 'regular',
    icon: <GithubIcon />,
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    colorTheme: 'netural',
  },
};

export const Primary: Story = {
  args: {
    size: 'small',
    colorTheme: 'primary',
  },
};
