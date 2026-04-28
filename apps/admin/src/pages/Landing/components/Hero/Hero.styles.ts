import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

import { LANDING_COLORS, mq_desktop, mq_lg } from '../../constants';

const marquee = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  padding: 104px 20px 32px;
  background: ${LANDING_COLORS.heroGradient};

  ${mq_lg} {
    padding: 140px 24px 24px;
  }

  ${mq_desktop} {
    padding: 140px 32px 48px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 32px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  ${mq_desktop} {
    gap: 43px;
  }
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
`;

const Eyebrow = styled.span`
  font-family: Pretendard, sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.3;
  letter-spacing: -0.04em;
  color: #a2a5b4;

  ${mq_lg} {
    font-size: 22px;
  }

  ${mq_desktop} {
    font-size: 26px;
  }
`;

const Title = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  font-family: Pretendard, sans-serif;
  font-weight: 500;
  font-size: 28px;
  line-height: 1.45;
  letter-spacing: -0.02em;
  color: #ffffff;
  margin: 0;

  ${mq_lg} {
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    font-size: 34px;
  }

  ${mq_desktop} {
    font-size: 42px;
  }
`;

const TitleRow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

const LogoMark = styled.span`
  display: inline-flex;
  align-items: center;
  height: 1em;

  svg,
  img {
    height: 1em;
    width: auto;
  }
`;

const ImageRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  padding: 32px 8px;
  overflow-x: hidden;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${mq_desktop} {
    gap: 16px;
    padding: 24px 8px;
    justify-content: center;
  }
`;

const MarqueeTrack = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  animation: ${marquee} 29.6s linear infinite;
  width: max-content;

  ${mq_desktop} {
    gap: 16px;
  }
`;

const ImageCard = styled.img`
  flex-shrink: 0;
  width: auto;
  height: 268px;
  border-radius: 16px;
  object-fit: contain;
  background-color: #2a2a3d;
  user-select: none;

  ${mq_lg} {
    height: 322px;
  }

  ${mq_desktop} {
    height: 376px;
  }
`;

export default {
  Section,
  Container,
  TextBlock,
  Eyebrow,
  Title,
  TitleRow,
  LogoMark,
  ImageRow,
  MarqueeTrack,
  ImageCard,
};
