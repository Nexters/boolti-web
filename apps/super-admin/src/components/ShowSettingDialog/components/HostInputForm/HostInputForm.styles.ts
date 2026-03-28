import { Button } from '@boolti/ui';
import styled from '@emotion/styled';

interface InputWrapperProps {
  text: string;
}

interface InputProps {
  value: string;
}

const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InputWrapper = styled.div<InputWrapperProps>`
  ${({ theme }) => theme.typo.b3};
  border: 1px solid ${({ text, theme }) => (text ? theme.palette.grey.g90 : theme.palette.grey.g20)};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  padding: 0 12px;
  flex: 1;
  min-width: 0;
  position: relative;
  display: flex;
  align-items: center;
  height: 48px;
`;

const Input = styled.input<InputProps>`
  flex: 1;
  min-width: 0;
  line-height: 24px;
  border: none;
  outline: none;
  background: none;

  &::placeholder {
    color: ${({ theme }) => theme.palette.grey.g30};
  }
`;

const RoleDivider = styled.div`
  width: 1px;
  height: 20px;
  background-color: ${({ theme }) => theme.palette.grey.g20};
  margin: 0 8px;
  flex-shrink: 0;
`;

const RoleDropdown = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const RoleButton = styled.button`
  display: flex;
  align-items: center;
  gap: 2px;
  background: none;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  padding: 0;
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};

  svg {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.palette.grey.g60};
  }
`;

const RoleDropdownList = styled.ul`
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  background-color: ${({ theme }) => theme.palette.grey.w};
  z-index: 1;
`;

const RoleDropdownItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 112px;
  padding: 7px 12px;
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g70};
  background-color: ${({ theme }) => theme.palette.grey.w};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.palette.grey.g10};
  }

  &:first-of-type {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  &:last-child {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;

const InviteButton = styled(Button)`
  flex-shrink: 0;
  white-space: nowrap;
  height: 48px;
  padding: 13px 20px;

  &:disabled {
    color: ${({ theme }) => theme.palette.grey.g40};
  }
`;

export default {
  Form,
  InputWrapper,
  Input,
  RoleDivider,
  RoleDropdown,
  RoleButton,
  RoleDropdownList,
  RoleDropdownItem,
  InviteButton,
};
