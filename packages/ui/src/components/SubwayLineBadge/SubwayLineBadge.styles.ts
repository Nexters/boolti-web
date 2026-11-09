import styled from '@emotion/styled';

import { SubwayLineBadgeSize } from './index';

interface ContainerProps {
  backgroundColor: string;
  textColor: string;
  size: SubwayLineBadgeSize;
  isCircle: boolean;
}

const FONT_BY_SIZE: Record<SubwayLineBadgeSize, { fontSize: number; fontWeight: number }> = {
  small: { fontSize: 11, fontWeight: 700 },
  medium: { fontSize: 14, fontWeight: 600 },
};

const Container = styled.span<ContainerProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  min-width: 20px;
  padding: ${({ isCircle }) => (isCircle ? '0' : '0 7px')};
  border-radius: 100px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ textColor }) => textColor};
  font-size: ${({ size }) => FONT_BY_SIZE[size].fontSize}px;
  font-weight: ${({ size }) => FONT_BY_SIZE[size].fontWeight};
  line-height: 1;
  white-space: nowrap;
`;

export default {
  Container,
};
