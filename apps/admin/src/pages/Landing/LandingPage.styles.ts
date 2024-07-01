import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';
import { m } from 'framer-motion';

const Container = styled(m.div)`
  overflow: hidden;
  width: 100vw;
  min-height: 100vh;
  padding-top: 48px;
  &::-webkit-scrollbar {
    display: none;
  }
  ${mq_lg} {
    padding-top: 68px;
  }
`;

const FooterContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.grey.g00};

  & > footer {
    margin: 0 auto;
  }
`;

export default {
  Container,
  FooterContainer,
};
