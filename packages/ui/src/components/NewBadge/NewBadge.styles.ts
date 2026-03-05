import styled from '@emotion/styled';

import { mq_lg } from '../../systems';

type ColorTheme = 'green' | 'red' | 'grey';

export interface NewBadgeProps {
  colorTheme: ColorTheme;
}

const Container = styled.span<NewBadgeProps>`
  display: inline-flex;
  flex: 0 0 auto;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 600;
  ${({ colorTheme, theme }) => {
    switch (colorTheme) {
      case 'green':
        return `
          color: #37A600;
          background-color: #C9EBB8;
        `;
      case 'red':
        return `
          color: ${theme.palette.status.error1};
          background-color: ${theme.palette.status.error1}${theme.palette.opacity[20]};
        `;
      case 'grey':
        return `
          color: ${theme.palette.grey.g60};
          background-color: ${theme.palette.grey.g20};
        `;
    }
  }}

  ${mq_lg} {
    ${({ theme }) => theme.typo.sh0};
  }
`;

export default {
  Container,
};
