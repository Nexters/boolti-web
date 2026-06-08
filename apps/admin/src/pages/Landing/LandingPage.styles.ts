import styled from '@emotion/styled';
import { m } from 'framer-motion';

import { mq_desktop, mq_lg } from './constants';

const Container = styled(m.div)`
  overflow: hidden;
  min-height: 100vh;

  &::-webkit-scrollbar {
    display: none;
  }
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
  FooterContainer,
};
