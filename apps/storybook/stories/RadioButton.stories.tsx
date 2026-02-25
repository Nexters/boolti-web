import { RadioButton } from '@boolti/ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof RadioButton> = {
  title: '컴포넌트/라디오버튼',
  component: RadioButton,
};

export default meta;

type Story = StoryObj<typeof RadioButton>;

export const Default: Story = {
  args: {
    label: 'Label',
    checked: false,
    disabled: false,
  },
};

export const Checked: Story = {
  args: {
    label: 'Label',
    checked: true,
    disabled: false,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Label',
    checked: true,
    disabled: true,
  },
};

export const DisabledUnchecked: Story = {
  args: {
    label: 'Label',
    checked: false,
    disabled: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <RadioButton value="inactive" label="Inactive" />
      <RadioButton value="hover" label="Hover" />
      <RadioButton value="active" label="Active" checked />
      <RadioButton value="disabled-active" label="Disabled Active" checked disabled />
      <RadioButton value="disabled-inactive" label="Disabled Inactive" disabled />
    </div>
  ),
};

const InteractiveRadioButton = () => {
  const [selected, setSelected] = useState('option1');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {['option1', 'option2', 'option3'].map((option) => (
        <RadioButton
          key={option}
          value={option}
          label={`Option ${option.slice(-1)}`}
          checked={selected === option}
          onChange={() => setSelected(option)}
        />
      ))}
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveRadioButton />,
};
