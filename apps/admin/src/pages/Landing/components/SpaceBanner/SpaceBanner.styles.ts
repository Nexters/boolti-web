import styled from '@emotion/styled';

import { LANDING_COLORS, mq_lg } from '../../constants';

const Banner = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px 20px;
  background-color: ${LANDING_COLORS.spaceBannerBg};
  border: 0;
  cursor: pointer;
  text-align: center;

  ${mq_lg} {
    padding: 14px 24px;
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  ${mq_lg} {
    flex-direction: row;
    gap: 12px;
  }
`;

const LeadGroup = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: Pretendard, sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 1;
  letter-spacing: 0;
  color: ${LANDING_COLORS.spaceBannerStrongText};

  ${mq_lg} {
    gap: 8px;
    font-size: 24px;
  }
`;

// Ribbon/tag mask: arrow point on the right edge with rounded corners
const PILL_MASK_IMAGE =
  "url(\"data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20132%2046'%20preserveAspectRatio='none'%3E%3Cpath%20d='M8,0L108,0Q116,0,120.6,6.6L127.4,16.4Q132,23,127.4,29.6L120.6,39.4Q116,46,108,46L8,46Q0,46,0,38L0,8Q0,0,8,0Z'%20fill='black'/%3E%3C/svg%3E\")";

const Pill = styled.span<{ variant: 'top' | 'bottom' }>`
  display: inline-flex;
  align-items: center;
  padding: 6px 22px 6px 12px;
  font-weight: 600;
  line-height: 1;
  background-color: ${({ variant }) =>
    variant === 'top'
      ? LANDING_COLORS.spaceBannerPillTopBg
      : LANDING_COLORS.spaceBannerPillBottomBg};
  color: ${({ variant }) =>
    variant === 'top'
      ? LANDING_COLORS.spaceBannerPillTopText
      : LANDING_COLORS.spaceBannerPillBottomText};
  /* Arrow-ribbon shape with rounded corners */
  -webkit-mask-image: ${PILL_MASK_IMAGE};
  mask-image: ${PILL_MASK_IMAGE};
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;

  ${mq_lg} {
    padding: 8px 26px 8px 14px;
  }
`;

const CtaGroup = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: Pretendard, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.4;
  letter-spacing: -0.02em;
  color: ${LANDING_COLORS.spaceBannerSubText};

  ${mq_lg} {
    font-size: 20px;
  }
`;

const Arrow = styled.span`
  display: inline-flex;
  align-items: center;
`;

export default {
  Banner,
  Inner,
  LeadGroup,
  Pill,
  CtaGroup,
  Arrow,
};
