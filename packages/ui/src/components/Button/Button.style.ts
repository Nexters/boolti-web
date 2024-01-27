import styled from '@emotion/styled';

type colorTheme = 'primary' | 'netural' | 'line';
type Size = 'bold' | 'medium' | 'regular' | 'small' | 'x-small';

export interface ButtonProps {
  colorTheme: colorTheme;
  size: Size;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const Container = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  transition:
    background-color 0.2s ease-in-out,
    border-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
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
          &:hover, &:active {
            border-color: ${props.theme.palette.primary.o2};
            background-color: ${props.theme.palette.primary.o2};
          }
          &:disabled {
            color: ${props.theme.palette.grey.g60};
            border-color: ${props.theme.palette.grey.g20};
            background-color: ${props.theme.palette.grey.g20};
          }
        `;
      case 'netural':
        return `
          color: ${props.theme.palette.grey.g00};
          border-color: ${props.theme.palette.grey.g90};
          background-color: ${props.theme.palette.grey.g90};
          &:hover {
            border-color: #707070;
            background-color: #707070;
          }
          &:active {
            border-color: ${props.theme.palette.grey.g60};
            background-color: ${props.theme.palette.grey.g60};
          }
          &:disabled {
            color: ${props.theme.palette.grey.g60};
            border-color: ${props.theme.palette.grey.g20};
            background-color: ${props.theme.palette.grey.g20};
          }
        `;
      case 'line':
        return `
          color: ${props.theme.palette.grey.g90};
          border-color: ${props.theme.palette.grey.g90};
          background-color: ${props.theme.palette.grey.g00};
          &:hover {
            border-color: #707070;
            color: #707070;
          }
          &:active {
            color: ${props.theme.palette.grey.g60};
            border-color: ${props.theme.palette.grey.g60};
          }
          &:disabled {
            color: ${props.theme.palette.grey.g40};
            border-color: ${props.theme.palette.grey.g20};
            background-color: ${props.theme.palette.grey.g10};
          }
        `;
    }
  }}
`;

const Icon = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

export default {
  Container,
  Icon,
};
