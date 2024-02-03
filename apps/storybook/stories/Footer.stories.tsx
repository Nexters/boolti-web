import type { Meta, StoryObj } from '@storybook/react';

import { Footer } from '@boolti/ui';

const meta: Meta<typeof Footer> = {
  title: '컴포넌트/푸터',
  component: Footer,
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {};
