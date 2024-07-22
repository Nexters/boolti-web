import styled from '@emotion/styled';

interface InputWrapperProps {
  text: string;
}

const Form = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 28px;
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
`;

const Input = styled.input`
  width: 100%;
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
  padding: 3px 6px;
  ${({ theme }) => theme.typo.c1};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.grey.g10};
  color: ${({ theme }) => theme.palette.grey.g60};
  cursor: pointer;
  width: 64px;
  margin-left: auto;
`;

const DropdownList = styled.ul`
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  background-color: ${({ theme }) => theme.palette.grey.w};
  margin-top: 4px;
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
`;

export default {
  Form,
  InputWrapper,
  Input,
  Dropdown,
  DropdownList,
  DropdownListItem,
  Chip,
};
