import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

import { LANDING_COLORS, mq_desktop } from '../../constants';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  gap: 40px;
  padding: 80px 0;
  background-color: ${LANDING_COLORS.solutionLightBg};

  ${mq_lg} {
    gap: 56px;
    padding: 96px 0;
  }

  ${mq_desktop} {
    gap: 64px;
    padding: 100px 0;
  }
`;

const Title = styled.h2`
  text-align: center;
  font-family: Pretendard, sans-serif;
  font-weight: 600;
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
  gap: 16px;
  overflow-x: auto;
  width: 100%;
  padding: 0 20px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${mq_lg} {
    gap: 16px;
    padding: 0 32px;
    justify-content: center;
  }

  ${mq_desktop} {
    padding: 0 80px;
  }
`;

const Card = styled.div<{ variant: 'light' | 'dark' }>`
  flex-shrink: 0;
  width: 320px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
  border: ${({ variant }) =>
    variant === 'dark' ? 'none' : `1px solid ${LANDING_COLORS.cardBorder}`};
  background-color: ${({ variant }) =>
    variant === 'dark' ? LANDING_COLORS.darkCardBg : '#FFFFFF'};

  ${mq_lg} {
    flex-direction: row;
    width: 560px;
    height: 420px;
  }

  ${mq_desktop} {
    width: 620px;
    height: 480px;
  }
`;

const TextCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: 32px;
  background-color: #ffffff;

  ${mq_lg} {
    flex: 0 0 55%;
    gap: 24px;
    padding: 48px 40px;
  }

  ${mq_desktop} {
    gap: 28px;
    padding: 60px 52px;
  }
`;

const Chip = styled.span`
  display: inline-flex;
  padding: 8px 16px;
  border-radius: 200px;
  background-color: ${LANDING_COLORS.chipBg};
  color: ${LANDING_COLORS.chipText};
  font-family: Pretendard, sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.3;

  ${mq_lg} {
    font-size: 18px;
  }

  ${mq_desktop} {
    font-size: 24px;
    padding: 10px 16px;
  }
`;

const CardTitle = styled.h3`
  font-family: Pretendard, sans-serif;
  font-weight: 600;
  font-size: 24px;
  line-height: 1.35;
  letter-spacing: -0.02em;
  white-space: pre-line;
  color: #000000;
  margin: 0;

  ${mq_lg} {
    font-size: 28px;
  }

  ${mq_desktop} {
    font-size: 32px;
  }
`;

const CardDescription = styled.p`
  font-family: Pretendard, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: #a2a5b4;
  margin: 0;

  ${mq_lg} {
    font-size: 20px;
  }

  ${mq_desktop} {
    font-size: 24px;
  }
`;

const ImgCard = styled.div<{ variant: 'light' | 'dark' }>`
  position: relative;
  flex: 1;
  min-height: 260px;
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
  min-height: 260px;
`;

const PromoImage = styled.img<{ offset: 'back' | 'front' }>`
  position: absolute;
  width: 55%;
  max-width: 180px;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);

  ${({ offset }) =>
    offset === 'back'
      ? `
    bottom: -20%;
    left: 8%;
    transform: rotate(-10deg);
    z-index: 1;
  `
      : `
    bottom: -32%;
    right: 0%;
    transform: rotate(6deg);
    z-index: 2;
  `}

  ${mq_lg} {
    max-width: 200px;

    ${({ offset }) =>
      offset === 'back'
        ? `
      bottom: -15%;
      left: 8%;
    `
        : `
      bottom: -28%;
      right: -5%;
    `}
  }
`;

const PaymentWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  min-height: 260px;
  padding-top: 24px;

  ${mq_lg} {
    padding-top: 40px;
  }
`;

const PaymentImage = styled.img`
  width: 70%;
  max-width: 260px;
  height: auto;
  border-radius: 28px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);

  ${mq_desktop} {
    max-width: 320px;
  }
`;

export default {
  Section,
  Title,
  ScrollArea,
  Card,
  TextCard,
  Chip,
  CardTitle,
  CardDescription,
  ImgCard,
  PromoStack,
  PromoImage,
  PaymentWrap,
  PaymentImage,
};
