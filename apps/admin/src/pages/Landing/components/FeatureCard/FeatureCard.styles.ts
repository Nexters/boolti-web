import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

import { LANDING_COLORS, mq_desktop } from '../../constants';

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
  gap: 16px;
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
  padding: 8px 14px;
  border-radius: 200px;
  background-color: ${LANDING_COLORS.chipBg};
  color: ${LANDING_COLORS.chipText};
  font-family: Pretendard, sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.3;
  letter-spacing: -0.02em;

  ${mq_lg} {
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
  gap: 8px;
  text-align: center;
`;

const Title = styled.h3`
  font-family: Pretendard, sans-serif;
  font-weight: 600;
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
  font-size: 14px;
  line-height: 1.5;
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
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  width: 100%;
  padding: 16px;
  border: 1px solid ${LANDING_COLORS.cardBorder};
  border-radius: 16px;
  background-color: #ffffff;

  ${mq_desktop} {
    padding: 32px;
    gap: 24px;
  }
`;

const MediaImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
`;

const MediaArrow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg,
  img {
    width: 100%;
    height: 100%;
  }

  ${mq_desktop} {
    width: 48px;
    height: 48px;
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
