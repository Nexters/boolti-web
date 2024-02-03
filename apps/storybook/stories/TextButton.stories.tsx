import type { Meta, StoryObj } from '@storybook/react';

import { GithubIcon } from '@boolti/icon';
import { TextButton } from '@boolti/ui';

const meta: Meta<typeof TextButton> = {
  title: '컴포넌트/텍스트버튼',
  component: TextButton,
};

export default meta;

type Story = StoryObj<typeof TextButton>;

export const Default: Story = {};

export const Icon: Story = {
  args: {
    icon: <GithubIcon size={20} />,
  },
};
