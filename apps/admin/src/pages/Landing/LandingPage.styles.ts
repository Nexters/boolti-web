import styled from '@emotion/styled';
import { m } from 'framer-motion';

import { mq_desktop, mq_lg } from './constants';

const Container = styled(m.div)`
  overflow-x: clip;
  min-height: 100vh;

  &::-webkit-scrollbar {
    display: none;
  }
`;

// 헤더 sticky 고정 영역. 상단 띠배너는 이 위에 일반 흐름으로 두어 스크롤 시 함께 밀려 올라가 사라지도록 함
const TopBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
`;

const FooterContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.grey.g00};

  & > footer {
    margin: 0 auto;
    padding-top: 60px;
    padding-bottom: 60px;
    padding-left: 24px;
    padding-right: 24px;
    max-width: none;

    ${mq_lg} {
      max-width: 672px;
      padding-left: 48px;
      padding-right: 48px;
    }

    ${mq_desktop} {
      max-width: 1040px;
      padding-left: 0;
      padding-right: 0;
    }
  }
`;

export default {
  Container,
  TopBar,
  FooterContainer,
};
