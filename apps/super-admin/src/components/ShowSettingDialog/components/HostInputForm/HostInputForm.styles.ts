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
  InviteButton,
};
