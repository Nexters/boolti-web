import styled from '@emotion/styled';

export interface TextFieldProps {
  size: 'small' | 'big';
  type: 'text' | 'date' | 'button';
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

const Input = styled.input`
  flex: 1;
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
`;

const ButtonContainer = styled.div`
  margin-left: 8px;
`;

export default {
  Container,
  Input,
  ButtonContainer,
};
