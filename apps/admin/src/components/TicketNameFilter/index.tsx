import { FilterIcon, SquareCheckIcon } from '@boolti/icon';
import Styled from './TicketNameFilter.styles';
import { useRef, useState } from 'react';
import { Button, TextButton, useDialog } from '@boolti/ui';
import { useOnClickOutside } from '@boolti/ui/src/hooks/useOnClickOutside';
import { useDeviceWidth } from '~/hooks/useDeviceWidth';
import { useTheme } from '@emotion/react';
import { useBodyScrollLock } from '~/hooks/useBodyScrollLock';

interface Option {
  label: string;
  value: string;
}

interface Props {
  updateSelectValues: (selectedValues: string[]) => void;
  selectedValues: string[];
  options: Option[];
}

const TicketFilterOptions = ({
  selectedValues,
  options,
  updateSelectValues,
  close,
}: Props & { close: VoidFunction }) => {
  const [tempSelectedValues, setTempSelectedValues] = useState(
    selectedValues.length === 0 ? options.map((option) => option.value) : selectedValues,
  );
  const ref = useRef(null);

  useOnClickOutside(ref, close, { skipWhenParentElementSame: true });
  useBodyScrollLock(true);

  return (
    <Styled.TicketOptions ref={ref}>
      <Styled.TicketOptionTitle>필터</Styled.TicketOptionTitle>
      <Styled.OptionList>
        {options.map((option) => (
          <Styled.OptionItem
            key={option.value}
            onClick={() => {
              setTempSelectedValues((prev) =>
                prev.includes(option.value)
                  ? prev.filter((value) => value !== option.value)
                  : [...prev, option.value],
              );
            }}
          >
            <SquareCheckIcon checked={tempSelectedValues.includes(option.value)} />
            {option.label}
          </Styled.OptionItem>
        ))}
      </Styled.OptionList>
      <Styled.ButtonWrap>
        <TextButton
          colorTheme="netural"
          size="small"
          onClick={() => {
            setTempSelectedValues(options.map((option) => option.value));
          }}
        >
          전체 선택
        </TextButton>
        <Button
          colorTheme="primary"
          size="regular"
          disabled={tempSelectedValues.length === 0}
          onClick={() => {
            if (tempSelectedValues.length > 0) {
              updateSelectValues(tempSelectedValues);
            }
            close();
          }}
        >
          {tempSelectedValues.length}개 티켓 보기
        </Button>
      </Styled.ButtonWrap>
    </Styled.TicketOptions>
  );
};

const TicketNameFilter = (props: Props) => {
  const deviceWidth = useDeviceWidth();
  const theme = useTheme();
  const isMobile = deviceWidth < parseInt(theme.breakpoint.mobile, 10);
  const [isOpen, setIsOpen] = useState(false);
  const { open, close } = useDialog();

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <Styled.Container>
      <Styled.TicketFilterButton
        isActive={props.selectedValues.length > 0}
        onClick={() => {
          if (!isMobile) {
            toggle();
          } else {
            open({
              content: <TicketFilterOptions {...props} close={close} />,
            });
          }
        }}
      >
        <FilterIcon />
        필터
      </Styled.TicketFilterButton>
      {isOpen && !isMobile && <TicketFilterOptions {...props} close={() => setIsOpen(false)} />}
    </Styled.Container>
  );
};

export default TicketNameFilter;
