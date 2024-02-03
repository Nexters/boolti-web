import styled from '@emotion/styled';

export interface DatePickerProps {
  fromInputProps?: Omit<React.ComponentProps<'input'>, 'type'>;
  toInputProps?: Omit<React.ComponentProps<'input'>, 'type'>;
  size: 'small' | 'big';
}

const Container = styled.div<DatePickerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
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
  & > div {
    width: auto;
    flex: 1;
  }
`;

export const Seperator = styled.span`
  margin: 0 4px;
  ${({ theme }) => theme.typo.b4};
  color: ${({ theme }) => theme.palette.grey.g80};
`;

export default { Container, Seperator };
