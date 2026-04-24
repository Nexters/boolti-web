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
  justify-content: center;
  gap: 24px;
  height: 240px;
  padding: 0 20px;
  background-color: #000000;
  overflow: hidden;

  ${mq_lg} {
    height: 320px;
    gap: 24px;
    padding: 0 32px;
  }

  ${mq_desktop} {
    height: 400px;
    gap: 32px;
    padding: 0 32px;
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
  opacity: 0.8;
  z-index: 1;
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
  margin: 0;

  ${mq_lg} {
    font-size: 34px;
  }

  ${mq_desktop} {
    font-size: 40px;
  }
`;

const BtnWrap = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: row;
  gap: 12px;
  width: auto;

  ${mq_lg} {
    gap: 16px;
  }
`;

const baseButton = `
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
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
  font-weight: 400;
  box-shadow: 0 8px 24px rgba(255, 104, 39, 0.3);

  ${mq_lg} {
    padding: 18px 28px;
    font-size: 20px;
  }

  ${mq_desktop} {
    padding: 20px 36px;
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
    font-size: 20px;
  }

  ${mq_desktop} {
    padding: 20px 36px;
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
