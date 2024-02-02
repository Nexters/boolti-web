import styled from '@emotion/styled';

export interface TextFieldProps {
  size: 'small' | 'big';
  inputType: 'text' | 'date' | 'file';
  disabled?: boolean;
  buttonProps?: React.ComponentProps<'button'>;
}

const Container = styled.div<TextFieldProps>`
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

const InputLabel = styled.label`
  display: block;
  width: 100%;
  height: 48px;
  border-radius: 4px;
  padding: 12px 13px;
  color: ${({ theme }) => theme.palette.grey.g90};
  border: 1px solid ${({ theme }) => theme.palette.grey.g90};
  background: ${({ theme }) => theme.palette.grey.w};
  ${({ theme }) => theme.typo.b3};
`;

const Input = styled.input`
  width: 100%;
  border-radius: 4px;
  padding: 12px 13px;
  color: ${({ theme }) => theme.palette.grey.g90};
  border: 1px solid ${({ theme }) => theme.palette.grey.g90};
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
  &[type='file'] {
    display: none;
  }
`;

const ButtonContainer = styled.div`
  margin-left: 8px;
`;

export default {
  Container,
  Input,
  InputLabel,
  InputContainer,
  ButtonContainer,
};
