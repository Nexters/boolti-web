import { TextField } from '@boolti/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TextField> = {
  title: '컴포넌트/텍스트필드',
  component: TextField,
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const Text: Story = {
  args: {
    size: 'small',
    value: 'Text 타입 인풋',
    inputType: 'text',
  },
};

export const Date: Story = {
  args: {
    size: 'small',
    value: '2024-02-03',
    inputType: 'date',
  },
};

export const File: Story = {
  args: {
    size: 'small',
    fileName: 'file.png',
    inputType: 'file',
  },
};

export const With_Button: Story = {
  args: {
    size: 'small',
    value: 'Text 타입 인풋',
    inputType: 'text',
    buttonProps: {
      children: 'BUTTON',
    },
  },
};

export const Disabled: Story = {
  args: {
    size: 'small',
    inputType: 'text',
    value: 'Text 타입 인풋',
    disabled: true,
  },
};

export const Disabled_With_Button: Story = {
  args: {
    size: 'small',
    inputType: 'text',
    value: 'Text 타입 인풋',
    disabled: true,
    buttonProps: {
      children: 'BUTTON',
    },
  },
};

export const Placeholder: Story = {
  args: {
    size: 'small',
    inputType: 'text',
    placeholder: 'Placeholder',
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    size: 'small',
    value: 'Text 타입 인풋',
    inputType: 'text',
    errorMessage: '계좌번호를 확인 후 다시 입력해 주세요.',
  },
};

export const Big: Story = {
  args: {
    size: 'big',
    value: 'Text 타입 인풋',
    inputType: 'text',
  },
};
