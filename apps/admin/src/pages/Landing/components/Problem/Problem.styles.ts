import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

import { mq_desktop } from '../../constants';

const Section = styled.section`
  position: relative;
  width: 100%;
  min-height: 360px;
  background-color: #020206;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  ${mq_lg} {
    min-height: 480px;
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
  font-weight: 600;
  font-size: 24px;
  line-height: 1.45;
  letter-spacing: -0.02em;
  color: #ffffff;
  white-space: pre-line;
  padding: 0 24px;
  margin: 0;

  ${mq_lg} {
    font-size: 32px;
  }

  ${mq_desktop} {
    font-size: 40px;
    padding: 0;
  }
`;

const FloatingLayer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1200px;
  height: 100%;
  display: none;
  pointer-events: none;

  ${mq_desktop} {
    display: block;
  }
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
  opacity: 0.55;
  user-select: none;
`;

export default {
  Section,
  Title,
  FloatingLayer,
  FloatingLogo,
};
