import { Button, useToast } from '@boolti/ui';
import type { Meta, StoryObj } from '@storybook/react';

interface Props {
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
}

function Toast({ type, message }: Props) {
  const toast = useToast();
  return (
    <Button colorTheme="primary" size="regular" onClick={() => toast[type](message)}>
      토스트 띄우기
    </Button>
  );
}

const meta: Meta<typeof Toast> = {
  title: '컴포넌트/토스트',
  component: Toast,
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: {
    type: 'success',
    message: '성공했을 때 메세지입니다.',
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    message: '경고 메세지입니다.',
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    message: '에러 메세지입니다.',
  },
};

export const Info: Story = {
  args: {
    type: 'info',
    message: '정보제공 메세지입니다.',
  },
};
