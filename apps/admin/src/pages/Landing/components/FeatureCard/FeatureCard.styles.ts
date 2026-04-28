import styled from '@emotion/styled';

import { LANDING_COLORS, mq_desktop, mq_lg } from '../../constants';

const Card = styled.article`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  padding: 0 24px 24px;

  ${mq_lg} {
    gap: 20px;
    padding: 0 0 32px;
  }

  ${mq_desktop} {
    gap: 24px;
    padding: 0 0 40px;
  }
`;

const Chip = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 200px;
  background-color: ${LANDING_COLORS.chipBg};
  color: ${LANDING_COLORS.chipText};
  font-family: Pretendard, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.3;
  letter-spacing: -0.02em;

  ${mq_lg} {
    padding: 8px 14px;
    font-size: 18px;
  }

  ${mq_desktop} {
    padding: 10px 16px;
    font-size: 24px;
  }
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;

  ${mq_lg} {
    gap: 12px;
  }

  ${mq_desktop} {
    gap: 16px;
  }
`;

const Title = styled.h3`
  font-family: Pretendard, sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 1.35;
  letter-spacing: -0.02em;
  white-space: pre-line;
  color: #000000;
  margin: 0;

  ${mq_lg} {
    font-size: 24px;
  }

  ${mq_desktop} {
    font-size: 32px;
  }
`;

const Description = styled.p`
  font-family: Pretendard, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.4;
  letter-spacing: -0.02em;
  white-space: pre-line;
  color: #a2a5b4;
  margin: 0;

  ${mq_lg} {
    font-size: 18px;
  }

  ${mq_desktop} {
    font-size: 24px;
  }
`;

const Media = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  width: 100%;
  padding: 0;
  border: 1px solid ${LANDING_COLORS.cardBorder};
  border-radius: 16px;
  background-color: #ffffff;
  overflow: hidden;

  ${mq_lg} {
    grid-template-columns: 1fr 1fr;
  }
`;

const MediaImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const MediaArrow = styled.div`
  position: absolute;
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(90deg);
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg,
  img {
    width: 100%;
    height: 100%;
  }

  ${mq_lg} {
    top: 50%;
    left: 49%;
    transform: translate(-50%, -50%) rotate(0deg);
    width: 40px;
    height: 40px;
  }

  ${mq_desktop} {
    left: 49.4%;
    width: 64px;
    height: 64px;
  }
`;

export default {
  Card,
  TextArea,
  Chip,
  TitleBlock,
  Title,
  Description,
  Media,
  MediaImage,
  MediaArrow,
};
