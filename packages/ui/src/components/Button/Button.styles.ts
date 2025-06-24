import styled from '@emotion/styled';

type ColorTheme = 'primary' | 'netural' | 'line' | 'secondary' | 'danger';
type Size = 'bold' | 'medium' | 'regular' | 'small' | 'x-small';

export interface ButtonProps {
  colorTheme: ColorTheme;
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
  cursor: pointer;
  &:disabled {
    cursor: unset;
  }
  ${({ size, theme }) => {
    switch (size) {
      case 'bold':
        return `
          height: 48px;
          padding: 13px 20px;
          ${theme.typo.sh1.styles};
        `;
      case 'medium':
        return `
          height: 44px;
          padding: 11px 18px;
          ${theme.typo.sh1.styles};
        `;
      case 'regular':
        return `
          height: 40px;
          padding: 9px 16px;
          ${theme.typo.sh1.styles};
        `;
      case 'small':
        return `
          height: 36px;
          padding: 7px 14px;
          ${theme.typo.sh1.styles};
        `;
      case 'x-small':
        return `
          height: 32px;
          padding: 5px 12px;
          ${theme.typo.b1.styles};
        `;
    }
  }}
  ${({ colorTheme, theme }) => {
    switch (colorTheme) {
      case 'primary':
        return `
          color: ${theme.palette.grey.g00};
          border-color: ${theme.palette.primary.o1};
          background-color: ${theme.palette.primary.o1};
          &:hover:not(:disabled), &:active:not(:disabled) {
            border-color: ${theme.palette.primary.o2};
            background-color: ${theme.palette.primary.o2};
          }
          &:disabled {
            color: ${theme.palette.grey.g40};
            border-color: ${theme.palette.grey.g20};
            background-color: ${theme.palette.grey.g20};
          }
        `;
      case 'netural':
        return `
          color: ${theme.palette.grey.g00};
          border-color: ${theme.palette.grey.g90};
          background-color: ${theme.palette.grey.g90};
          &:hover:not(:disabled) {
            border-color: #707070;
            background-color: #707070;
          }
          &:active:not(:disabled) {
            border-color: ${theme.palette.grey.g60};
            background-color: ${theme.palette.grey.g60};
          }
          &:disabled {
            color: ${theme.palette.grey.g60};
            border-color: ${theme.palette.grey.g20};
            background-color: ${theme.palette.grey.g20};
          }
        `;
      case 'line':
        return `
          color: ${theme.palette.grey.g90};
          border-color: ${theme.palette.grey.g90};
          background-color: ${theme.palette.grey.w};
          &:hover:not(:disabled) {
            border-color: #707070;
            color: #707070;
          }
          &:active:not(:disabled) {
            color: ${theme.palette.grey.g60};
            border-color: ${theme.palette.grey.g60};
          }
          &:disabled {
            color: ${theme.palette.grey.g40};
            border-color: ${theme.palette.grey.g20};
            background-color: ${theme.palette.grey.g10};
          }
        `;
      case 'secondary':
        return `
          color: ${theme.palette.grey.g90};
          border: 0;
          background-color: ${theme.palette.grey.g10};
          &:hover:not(:disabled) {
            background-color: ${theme.palette.grey.g20};
          }
          &:active:not(:disabled) {
            background-color: ${theme.palette.grey.g30};
          }
          &:disabled {
            color: ${theme.palette.grey.g40};
            background-color: ${theme.palette.grey.g00};
          }
        `;
      case 'danger':
        return `
          color: ${theme.palette.grey.w};
          border: 0;
          background-color: ${theme.palette.status.error1};
          &:hover:not(:disabled) {
            background-color: ${theme.palette.status.error2};
          }
          &:active:not(:disabled) {
            background-color: ${theme.palette.status.error3};
          }
          &:disabled {
            color: ${theme.palette.grey.g40};
            background-color: ${theme.palette.grey.g20};
          }
        `;
    }
  }}
`;

const Icon = styled.div<Pick<ButtonProps, 'size'> & { hasChildren: boolean }>`
  width: 20px;
  height: 20px;

  ${({ size, hasChildren }) => {
    if (!hasChildren) return null;

    switch (size) {
      case 'x-small':
        return `
          margin-right: 6px;
        `;
      default:
        return `
          margin-right: 8px;
        `;
    }
  }}
`;

export default {
  Container,
  Icon,
};
