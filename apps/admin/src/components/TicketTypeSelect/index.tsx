import { ChevronRightIcon } from '@boolti/icon';
import { useTheme } from '@emotion/react';
import Select from 'react-select';

interface Props {
  onChange: (value: string) => void;
}

const TicketTypeSelect = ({ onChange }: Props) => {
  const theme = useTheme();
  return (
    <Select
      onChange={(newItem) => newItem?.value && onChange(newItem.value)}
      components={{ DropdownIndicator: ChevronRightIcon }}
      isSearchable={false}
      options={[
        { value: 'ALL', label: '티켓 전체' },
        { value: 'SALE', label: '일반 티켓' },
        { value: 'INVITE', label: '초청 티켓' },
      ]}
      defaultValue={{ value: 'ALL', label: '티켓 전체' }}
      styles={{
        control: (base) => ({
          ...base,
          cursor: 'pointer',
          border: 'none !important',
          boxShadow: 'none !important',
          padding: 12,
        }),
        valueContainer: (base) => ({
          ...base,
          border: 'none',
          padding: 0,
          margin: 0,
        }),
        singleValue: (base) => ({
          ...base,
          fontSize: '15px',
          lineHeight: '23px',
          margin: 0,
          color: theme.palette.grey.g90,
        }),
        indicatorSeparator: () => ({
          display: 'none',
        }),
        indicatorsContainer: () => ({
          marginLeft: 12,
          width: 20,
          height: 20,
          '& > svg': {
            transform: 'rotate(90deg)',
          },
        }),
        input: (base) => ({
          ...base,
          fontSize: '15px',
          lineHeight: '23px',
          padding: 0,
          margin: 0,
          color: theme.palette.grey.g90,
        }),
        menu: (base) => ({
          ...base,
          margin: 0,
        }),
        menuList: () => ({}),
        option: (base, state) => ({
          ...base,
          cursor: 'pointer',
          padding: '8px 20px 8px 12px',
          fontSize: 14,
          fontWeight: state.isSelected ? 600 : 400,
          color: theme.palette.grey.g90,
          lineHeight: '22px',
          background: 'none !important',
        }),
      }}
    />
  );
};

export default TicketTypeSelect;