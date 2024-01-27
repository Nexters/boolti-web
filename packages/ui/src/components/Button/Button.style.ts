import styled from '@emotion/styled';

type Color = 'primary' | 'netural' | 'line';
type Size = 'bold' | 'medium' | 'regular' | 'small' | 'x-small';

export interface ButtonProps {
  color: Color;
  size: Size;
}

const Container = styled.button<ButtonProps>`
  border-width: 1px;
  border-style: solid;
  ${(props) => {
    switch (props.color) {
      case 'primary':
        return `
          background-color: ${props.theme.palette.primary.o1};
          border-color: ${props.theme.palette.primary.o1};
        `;
      case 'netural':
        return `
          background-color: ${props.theme.palette.grey.g90};
          border-color: ${props.theme.palette.grey.g90};
        `;
      case 'line':
        return `
          background-color: ${props.theme.palette.grey.g00};
          border-color: ${props.theme.palette.grey.g00};
        `;
    }
  }}
`;

export default {
  Container,
};
