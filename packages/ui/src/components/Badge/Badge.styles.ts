import styled from '@emotion/styled';

type colorTheme = 'purple' | 'blue' | 'green' | 'red' | 'grey';

export interface BadgeProps {
  colorTheme: colorTheme;
}

const Container = styled.span<BadgeProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 3px 8px;
  ${({ theme }) => theme.typo.b1};
  ${({ colorTheme, theme }) => {
    return `
      color: ${theme.palette[colorTheme].main};
      background-color: ${theme.palette[colorTheme].sub};
    `;
  }}
`;

export default {
  Container,
};
