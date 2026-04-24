import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

import { mq_desktop } from '../../constants';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  gap: 40px;
  padding: 80px 20px;
  background-color: #ffffff;

  ${mq_lg} {
    gap: 48px;
    padding: 100px 32px;
  }

  ${mq_desktop} {
    gap: 64px;
    padding: 100px 80px;
  }
`;

const Heading = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
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

const TitleRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-family: Pretendard, sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 1.35;
  letter-spacing: -0.02em;
  color: #000000;

  ${mq_lg} {
    flex-direction: row;
    gap: 12px;
    font-size: 34px;
  }

  ${mq_desktop} {
    font-size: 40px;
  }
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  ${mq_lg} {
    gap: 72px;
  }

  ${mq_desktop} {
    gap: 112px;
  }
`;

export default {
  Section,
  Heading,
  Eyebrow,
  TitleRow,
  CardList,
};
