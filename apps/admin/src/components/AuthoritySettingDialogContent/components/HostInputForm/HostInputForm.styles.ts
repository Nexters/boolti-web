import { Button, mq_lg } from '@boolti/ui';
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
  margin-bottom: 28px;
  margin-top: 20px;

  ${mq_lg} {
    margin-top: 0;
  }
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

const HashTag = styled.span`
  color: ${({ theme }) => theme.palette.grey.g90};
  line-height: 24px;
  padding-right: 4px;
`;

const Input = styled.input<InputProps>`
  width: ${({ value }) => (value ? 'calc(100% - 80px)' : '100%')};
  line-height: 24px;

  &::placeholder {
    color: ${({ theme }) => theme.palette.grey.g30};
  }
`;

const Dropdown = styled.div`
  position: absolute;
  right: 12px;
  top: 12px;
`;

const Chip = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0 0 6px;
  ${({ theme }) => theme.typo.c1};
  border: none;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.grey.g10};
  color: ${({ theme }) => theme.palette.grey.g60};
  cursor: pointer;
  width: 64px;
  height: 24px;
  margin-left: auto;

  svg {
    color: ${({ theme }) => theme.palette.grey.g50};
  }
`;

const DropdownList = styled.ul`
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  background-color: ${({ theme }) => theme.palette.grey.w};
  margin-top: 4px;
  box-shadow: 0px 8px 14px 0px #acabab21;
`;

const DropdownListItem = styled.li`
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

  svg {
    color: ${({ theme }) => theme.palette.grey.g90};
  }
`;

const InviteButton = styled(Button)`
  width: 48px;
  height: 48px;
  padding: 14px;

  ${mq_lg} {
    width: auto;
    padding: 13px 20px;

    &:disabled {
      color: ${({ theme }) => theme.palette.grey.g40};
    }
  }
`;

export default {
  Form,
  InputWrapper,
  HashTag,
  Input,
  Dropdown,
  DropdownList,
  DropdownListItem,
  Chip,
  InviteButton,
};
