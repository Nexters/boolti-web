import styled from '@emotion/styled';

interface SelectProps {
  selected: boolean;
}

interface SelectOptionProps {
  selected?: boolean;
}

const SelectContainer = styled.div`
  position: relative;
`;

const Select = styled.div<SelectProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  height: 48px;
  padding: 0 12px;
  color: ${({ theme, selected }) => (selected ? theme.palette.grey.g90 : theme.palette.grey.g30)};
  background-color: ${({ theme }) => theme.palette.grey.w};
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-radius: 4px;
  position: relative;
`;

const SelectText = styled.span`
  display: inline-block;
`;

const ChevronDownIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 56px;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.grey.w};
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-radius: 4px;
  box-shadow: 0px 8px 14px 0px ${({ theme }) => theme.palette.shadow};
  z-index: 1;
`;

const Option = styled.div<SelectOptionProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 48px;
  padding: 0 12px;
  ${({ theme, selected }) => (selected ? theme.typo.sh1 : theme.typo.b3)};
  color: ${({ theme }) => theme.palette.grey.g90};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.palette.grey.g10};
  }
`;

const CheckIconContainer = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default {
  SelectContainer,
  Select,
  SelectText,
  ChevronDownIconContainer,
  Dropdown,
  Option,
  CheckIconContainer,
};
