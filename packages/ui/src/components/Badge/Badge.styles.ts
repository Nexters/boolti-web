import styled from '@emotion/styled';

import { mq_lg } from '../../systems';

type colorTheme = 'purple' | 'blue' | 'green' | 'red' | 'grey';

export interface BadgeProps {
  colorTheme: colorTheme;
}

const Container = styled.span<BadgeProps>`
  display: inline-flex;
  flex: 0 0 auto;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 3px 6px;
  height: 24px;
  ${({ theme }) => theme.typo.c1};
  ${({ colorTheme, theme }) => {
    return `
      color: ${theme.palette[colorTheme].main};
      background-color: ${theme.palette[colorTheme].sub};
    `;
  }}

  ${mq_lg} {
    ${({ theme }) => theme.typo.b1};
    padding: 0 8px;
    height: 28px;
  }
`;

export default {
  Container,
};
