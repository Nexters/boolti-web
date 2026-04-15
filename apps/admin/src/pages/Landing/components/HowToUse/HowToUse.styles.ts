import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { LANDING_COLORS, mq_desktop } from '../../constants';

const Section = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  gap: 40px;
  padding: 80px 20px;
  background-color: #000000;
  overflow: hidden;

  ${mq_lg} {
    gap: 48px;
    padding: 96px 32px;
  }

  ${mq_desktop} {
    gap: 56px;
    padding: 120px 32px;
  }
`;

const Light = styled.img`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1200px;
  height: auto;
  pointer-events: none;
  opacity: 0.6;
  z-index: 1;
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
  margin: 0;

  ${mq_lg} {
    font-size: 32px;
  }

  ${mq_desktop} {
    font-size: 40px;
  }
`;

const BtnWrap = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 360px;

  ${mq_lg} {
    flex-direction: row;
    width: auto;
    max-width: none;
    gap: 16px;
  }
`;

const baseButton = `
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  border-radius: 12px;
  font-family: Pretendard, sans-serif;
  font-size: 16px;
  line-height: 1.3;
  letter-spacing: -0.02em;
  cursor: pointer;
  text-decoration: none;
  border: 0;
`;

const PrimaryButton = styled(Link)`
  ${baseButton}
  background-color: ${LANDING_COLORS.primaryCta};
  color: #ffffff;
  font-weight: 500;
  box-shadow: 0 8px 24px rgba(255, 104, 39, 0.3);

  ${mq_lg} {
    padding: 18px 28px;
    font-size: 18px;
  }

  ${mq_desktop} {
    padding: 20px 32px;
    font-size: 24px;
  }
`;

const SecondaryButton = styled.button`
  ${baseButton}
  background-color: ${LANDING_COLORS.darkButton};
  color: ${LANDING_COLORS.darkButtonText};
  font-weight: 400;

  ${mq_lg} {
    padding: 18px 28px;
    font-size: 18px;
  }

  ${mq_desktop} {
    padding: 20px 32px;
    font-size: 24px;
  }
`;

export default {
  Section,
  Light,
  Title,
  BtnWrap,
  PrimaryButton,
  SecondaryButton,
};
