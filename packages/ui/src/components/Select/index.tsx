import { CheckIcon, ChevronDownIcon } from '@boolti/icon';
import { useEffect, useRef, useState } from 'react';

import Styled from './Select.styles';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string | null;
  options: SelectOption[];
  additionalButton?: React.ReactNode;
  placeholder?: string;
  onSelect: (option: SelectOption) => void;
  onAdditionalButtonClick?: () => void;
}

const Select = ({
  value,
  options,
  additionalButton,
  placeholder = '',
  onSelect,
  onAdditionalButtonClick,
}: SelectProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const selectContainerRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((option) => option.value === value)?.label ?? value;

  useEffect(() => {
    const outsideClickHandler = (event: MouseEvent) => {
      if (
        selectContainerRef.current &&
        !selectContainerRef.current.contains(event.target as HTMLElement)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('click', outsideClickHandler);

    return () => {
      document.removeEventListener('click', outsideClickHandler);
    };
  }, []);

  return (
    <Styled.SelectContainer ref={selectContainerRef}>
      <Styled.Select
        selected={value !== null}
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <Styled.SelectText>{value === null ? placeholder : selectedLabel}</Styled.SelectText>
        <Styled.ChevronDownIconContainer>
          <ChevronDownIcon />
        </Styled.ChevronDownIconContainer>
      </Styled.Select>
      {open && (
        <Styled.Dropdown>
          {options.map((option) => {
            const selected = value === option.value;

            return (
              <Styled.Option
                key={option.value}
                selected={selected}
                onClick={() => {
                  setOpen(false);
                  onSelect(option);
                }}
              >
                <Styled.CheckIconContainer>{selected && <CheckIcon />}</Styled.CheckIconContainer>
                {option.label}
              </Styled.Option>
            );
          })}
          {additionalButton && (
            <Styled.Option
              onClick={() => {
                setOpen(false);
                onAdditionalButtonClick?.();
              }}
            >
              <Styled.CheckIconContainer />
              {additionalButton}
            </Styled.Option>
          )}
        </Styled.Dropdown>
      )}
    </Styled.SelectContainer>
  );
};

export default Select;
