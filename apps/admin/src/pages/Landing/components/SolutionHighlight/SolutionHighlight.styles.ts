import styled from '@emotion/styled';

import { LANDING_COLORS, mq_desktop, mq_lg } from '../../constants';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  gap: 40px;
  padding: 64px 0;
  background-color: ${LANDING_COLORS.solutionLightBg};

  ${mq_lg} {
    gap: 48px;
    padding: 100px 0;
  }

  ${mq_desktop} {
    gap: 64px;
    padding: 100px 0;
  }
`;

const Title = styled.h2`
  text-align: center;
  font-family: Pretendard, sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 1.35;
  letter-spacing: -0.02em;
  color: #000000;
  white-space: pre-line;
  padding: 0 20px;
  margin: 0;

  ${mq_lg} {
    font-size: 34px;
  }

  ${mq_desktop} {
    font-size: 40px;
    padding: 0;
  }
`;

const ScrollArea = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  overflow-x: auto;
  width: 100%;
  padding: 0 24px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${mq_lg} {
    gap: 12px;
    padding: 0;
    justify-content: center;
  }

  ${mq_desktop} {
    gap: 16px;
    padding: 0 80px;
    justify-content: flex-start;
  }
`;

const Card = styled.div<{ variant: 'light' | 'dark' }>`
  flex-shrink: 0;
  width: 246px;
  height: 400px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
  border: ${({ variant }) =>
    variant === 'dark' ? 'none' : `1px solid ${LANDING_COLORS.cardBorder}`};
  background-color: ${({ variant }) =>
    variant === 'dark' ? LANDING_COLORS.darkCardBg : '#FFFFFF'};

  ${mq_lg} {
    width: 345px;
    height: 560px;
  }

  ${mq_desktop} {
    flex-direction: row;
    width: 920px;
    height: 560px;
  }
`;

const TextCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
  padding: 32px 28px;
  background-color: #ffffff;

  ${mq_lg} {
    gap: 20px;
    padding: 48px 40px;
  }

  ${mq_desktop} {
    flex: 0 0 33.3%;
    gap: 28px;
    padding: 60px 52px;
  }
`;

const TitleDescriptionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  ${mq_lg} {
    gap: 12px;
  }

  ${mq_desktop} {
    gap: 16px;
  }
`;

const Chip = styled.span`
  display: inline-flex;
  padding: 6px 10px;
  border-radius: 200px;
  background-color: ${LANDING_COLORS.chipBg};
  color: ${LANDING_COLORS.chipText};
  font-family: Pretendard, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.3;

  ${mq_lg} {
    padding: 8px 14px;
    font-size: 18px;
  }

  ${mq_desktop} {
    padding: 10px 16px;
    font-size: 24px;
  }
`;

const CardTitle = styled.h3`
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

const CardDescription = styled.p`
  font-family: Pretendard, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.4;
  letter-spacing: -0.02em;
  color: #a2a5b4;
  margin: 0;

  ${mq_lg} {
    font-size: 18px;
  }

  ${mq_desktop} {
    font-size: 24px;
  }
`;

const ImgCard = styled.div<{ variant: 'light' | 'dark' }>`
  position: relative;
  flex: 1;
  min-height: 200px;
  overflow: hidden;
  background: ${({ variant }) =>
    variant === 'dark' ? LANDING_COLORS.paymentGradient : LANDING_COLORS.promoGradient};

  ${mq_lg} {
    min-height: 0;
  }
`;

const PromoStack = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 200px;
`;

const PromoImage = styled.img<{ offset: 'back' | 'front' }>`
  position: absolute;
  width: 55%;
  max-width: 180px;
  height: auto;
  border-radius: 20px;

  ${({ offset }) =>
    offset === 'back'
      ? `
    top: 15%;
    left: 5.2%;
    z-index: 1;
  `
      : `
    top: -16.25%;
    left: 51%;
    z-index: 2;
  `}

  ${mq_lg} {
    width: 43.9%;
    max-width: 269px;
  }

  ${mq_desktop} {
    width: 269px;
    height: 567px;
    border-radius: 26px;

    ${({ offset }) =>
      offset === 'back'
        ? `
      top: 84px;
      left: 32px;
    `
        : `
      top: -91px;
      left: 312.33px;
    `}
  }
`;

const PaymentWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 200px;
`;

const PaymentImage = styled.img`
  position: absolute;
  top: 11.4%;
  left: 13.4%;
  width: 73.1%;
  height: auto;
  border-radius: 28px;

  ${mq_desktop} {
    top: 64px;
    left: 82.33px;
    width: 448px;
    height: 990px;
    border-radius: 35px;
  }
`;

export default {
  Section,
  Title,
  ScrollArea,
  Card,
  TextCard,
  TitleDescriptionGroup,
  Chip,
  CardTitle,
  CardDescription,
  ImgCard,
  PromoStack,
  PromoImage,
  PaymentWrap,
  PaymentImage,
};
