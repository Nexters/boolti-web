import styled from '@emotion/styled';

import { mq } from '../../systems';

type colorTheme = 'primary' | 'netural';
type Size = 'small' | 'regular';

export interface ButtonProps {
  colorTheme: colorTheme;
  size: Size;
}

const Container = styled.button<ButtonProps>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: none;
  background-color: transparent;
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  ${({ theme }) => theme.typo.sh1};
  &:disabled {
    cursor: unset;
    color: ${({ theme }) => theme.palette.grey.g60};
  }
  ${({ size }) => {
    switch (size) {
      case 'regular':
        return `
          height: 44px;
          padding: 11px 18px;
        `;
      case 'small':
        return `
          height: 22px;
          padding: 0 4px;
        `;
    }
  }}
  ${({ colorTheme, theme }) => {
    switch (colorTheme) {
      case 'netural':
        return `
          color: ${theme.palette.grey.g90};
          &:hover:not(:disabled) {
            background-color: ${theme.palette.grey.g20};
          }
        `;
      case 'primary':
        return `
          color: ${theme.palette.primary.o1};
          &:hover:not(:disabled) {
            color: ${theme.palette.primary.o2};
          }
        `;
    }
  }}
`;

const Icon = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 4px;

  ${mq} {
    margin-right: 8px;
  }
`;

export default {
  Container,
  Icon,
};
