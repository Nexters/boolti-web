import { TicketType } from '@boolti/api';
import { Select } from 'antd';

interface Props {
  ticketType: 'ALL' | TicketType;
  onChange: (value: 'ALL' | TicketType) => void;
}

export const options = [
  { value: 'ALL', label: '티켓 전체' },
  { value: 'SALE', label: '일반 티켓' },
  { value: 'INVITE', label: '초청 티켓' },
] as const;

const TicketTypeSelect = ({ onChange, ticketType }: Props) => {
  return (
    <Select
      variant="borderless"
      onChange={(newItem) => onChange(newItem as 'ALL' | TicketType)}
      value={ticketType}
      options={[
        { value: 'ALL', label: '티켓 전체' },
        { value: 'SALE', label: '일반 티켓' },
        { value: 'INVITE', label: '초청 티켓' },
      ]}
      defaultValue={'ALL'}
    />
  );
};

export default TicketTypeSelect;
