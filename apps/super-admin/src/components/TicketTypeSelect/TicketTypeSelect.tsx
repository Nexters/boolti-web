import { Select } from 'antd';

type Value = (typeof options)[number];

interface Props {
  value: Value;
  onChange: (value: Value) => void;
}

export const options = [
  { value: 'ALL', label: '티켓 전체' },
  { value: 'SALE', label: '일반 티켓' },
  { value: 'INVITE', label: '초청 티켓' },
] as const;

const TicketTypeSelect = ({ onChange, value }: Props) => {
  return (
    <Select
      variant="borderless"
      onChange={(newItem) => newItem && onChange(newItem as Value)}
      value={value}
      options={[
        { value: 'ALL', label: '티켓 전체' },
        { value: 'SALE', label: '일반 티켓' },
        { value: 'INVITE', label: '초청 티켓' },
      ]}
      defaultValue={{ value: 'ALL', label: '티켓 전체' }}
    />
  );
};

export default TicketTypeSelect;
