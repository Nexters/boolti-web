import styled from '@emotion/styled';

import { mq_desktop, mq_lg } from '../../constants';

const Section = styled.section`
  position: relative;
  width: 100%;
  height: 492px;
  background-color: #020206;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  ${mq_lg} {
    height: 454px;
  }

  ${mq_desktop} {
    height: 631px;
  }
`;

const Title = styled.h2`
  position: relative;
  z-index: 2;
  text-align: center;
  font-family: Pretendard, sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 1.45;
  letter-spacing: -0.02em;
  color: #ffffff;
  white-space: pre-line;
  padding: 0 24px;
  margin: 0;

  ${mq_lg} {
    font-size: 34px;
  }

  ${mq_desktop} {
    font-size: 40px;
    padding: 0;
  }
`;

const FloatingLayer = styled.div<{ layerWidth: number }>`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: ${({ layerWidth }) => layerWidth}px;
  height: 100%;
  pointer-events: none;
`;

const FloatingLogo = styled.img<{
  top: number;
  left: number;
  width: number;
  height: number;
}>`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  object-fit: contain;
  user-select: none;
`;

export default {
  Section,
  Title,
  FloatingLayer,
  FloatingLogo,
};
