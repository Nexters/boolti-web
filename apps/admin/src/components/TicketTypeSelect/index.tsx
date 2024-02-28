import { ChevronRightIcon } from '@boolti/icon';
import { breakpoint } from '@boolti/ui';
import { useTheme } from '@emotion/react';
import Select from 'react-select';

import { useDeviceWidth } from '~/hooks/useDeviceWidth';

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
  const theme = useTheme();
  const width = useDeviceWidth();
  return (
    <Select
      onChange={(newItem) => newItem && onChange(newItem as Value)}
      components={{ DropdownIndicator: ChevronRightIcon }}
      isSearchable={false}
      value={value}
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
          padding: width > Number(breakpoint.mobile) ? 12 : 0,
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
