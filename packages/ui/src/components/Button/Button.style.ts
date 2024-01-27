import styled from '@emotion/styled';

type colorTheme = 'primary' | 'netural' | 'line';
type Size = 'bold' | 'medium' | 'regular' | 'small' | 'x-small';

export interface ButtonProps {
  colorTheme: colorTheme;
  size: Size;
}

const Container = styled.button<ButtonProps>`
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  ${(props) => {
    switch (props.size) {
      case 'bold':
        return `
          height: 48px;
          padding: 13px 20px;
          ${props.theme.typo.sh1.styles};
        `;
      case 'medium':
        return `
          height: 44px;
          padding: 11px 18px;
          ${props.theme.typo.sh1.styles};
        `;
      case 'regular':
        return `
          height: 40px;
          padding: 9px 16px;
          ${props.theme.typo.sh1.styles};
        `;
      case 'small':
        return `
          height: 36px;
          padding: 7px 14px;
          ${props.theme.typo.sh1.styles};
        `;
      case 'x-small':
        return `
          height: 32px;
          padding: 5px 12px;
          ${props.theme.typo.b1.styles};
        `;
    }
  }}
  ${(props) => {
    switch (props.colorTheme) {
      case 'primary':
        return `
          color: ${props.theme.palette.grey.g00};
          border-color: ${props.theme.palette.primary.o1};
          background-color: ${props.theme.palette.primary.o1};
        `;
      case 'netural':
        return `
          color: ${props.theme.palette.grey.g00};
          border-color: ${props.theme.palette.grey.g90};
          background-color: ${props.theme.palette.grey.g90};
        `;
      case 'line':
        return `
          color: ${props.theme.palette.grey.g90};
          border-color: ${props.theme.palette.grey.g90};
          background-color: ${props.theme.palette.grey.g00};
        `;
    }
  }}
`;

export default {
  Container,
};
