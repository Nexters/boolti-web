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
`;

const InputWrapper = styled.div<InputWrapperProps>`
  ${({ theme }) => theme.typo.b3};
  border: 1px solid ${({ text, theme }) => (text ? theme.palette.grey.g90 : theme.palette.grey.g20)};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  padding: 12px;
  margin-right: 8px;
  flex: auto;
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input<InputProps>`
  width: 100%;
  line-height: 24px;

  &::placeholder {
    color: ${({ theme }) => theme.palette.grey.g30};
  }
`;

const RoleDropdown = styled.div`
  position: relative;
  margin-right: 8px;
`;

const RoleButton = styled.button`
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  cursor: pointer;
  white-space: nowrap;
  ${({ theme }) => theme.typo.b3};

  svg {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.palette.grey.g60};
  }
`;

const RoleDropdownList = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
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
  width: auto;
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
  RoleDropdown,
  RoleButton,
  RoleDropdownList,
  RoleDropdownItem,
  InviteButton,
};
