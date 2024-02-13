import styled from '@emotion/styled';

export interface TextFieldProps {
  size: 'small' | 'big';
  inputType: 'text' | 'date' | 'file' | 'time' | 'number';
  disabled?: boolean;
  buttonProps?: React.ComponentProps<'button'>;
  fileName?: string;
  errorMessage?: string;
}

const Container = styled.div<TextFieldProps>`
  position: relative;
  display: flex;
  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          width: 386px;
        `;
      case 'big':
        return `
          width: 600px;
        `;
    }
  }}
`;

const InputContainer = styled.div`
  position: relative;
  flex: 1;

  & > svg {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const InputLabel = styled.label<{ hasError?: boolean; disabled?: boolean }>`
  display: block;
  width: 100%;
  height: 48px;
  border-radius: 4px;
  padding: 12px 13px;
  color: ${({ theme }) => theme.palette.grey.g90};
  border: 1px solid
    ${({ hasError, theme }) => (hasError ? theme.palette.status.error : theme.palette.grey.g90)};
  background: ${({ theme }) => theme.palette.grey.w};
  ${({ theme }) => theme.typo.b3};

  ${({ disabled, theme }) =>
    disabled &&
    `
      border: 1px solid ${theme.palette.grey.g20};
      background: ${theme.palette.grey.g10};
      color: ${theme.palette.grey.g40};
    `}
`;

const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  border-radius: 4px;
  padding: 12px 13px;
  color: ${({ theme }) => theme.palette.grey.g90};
  border: 1px solid
    ${({ hasError, theme }) => (hasError ? theme.palette.status.error : theme.palette.grey.g90)};
  background: ${({ theme }) => theme.palette.grey.w};
  ${({ theme }) => theme.typo.b3};
  &:placeholder-shown {
    border: 1px solid ${({ theme }) => theme.palette.grey.g20};
    color: ${({ theme }) => theme.palette.grey.g30};
  }
  &:disabled {
    background: ${({ theme }) => theme.palette.grey.g10};
    border: 1px solid ${({ theme }) => theme.palette.grey.g20};
    color: ${({ theme }) => theme.palette.grey.g40};
  }
  &[type='date'] {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
  }
  &[type='date']::before {
    content: attr(data-placeholder);
    width: 100%;
  }
  &[type='date']::-webkit-inner-spin-button,
  &[type='date']::-webkit-calendar-picker-indicator {
    position: absolute;
    right: -10px;
    top: 0;
    transform: translateX(-10px);
    padding-left: 600px;
    height: 100%;
    opacity: 0;
  }
  &[type='time']::-webkit-calendar-picker-indicator {
    background: transparent;
    color: transparent;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: auto;
    height: auto;
  }
  &[type='file'] {
    display: none;
  }
`;

const ButtonContainer = styled.div`
  margin-left: 8px;
`;

const ErrorMessage = styled.span`
  position: absolute;
  bottom: -4px;
  transform: translateY(100%);
  color: ${({ theme }) => theme.palette.status.error};
`;

export default {
  Container,
  Input,
  InputLabel,
  InputContainer,
  ButtonContainer,
  ErrorMessage,
};
