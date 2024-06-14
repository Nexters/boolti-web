import { desktopMq } from '@boolti/ui';
import styled from '@emotion/styled';
import { m } from 'framer-motion';

const Container = styled(m.div)`
  width: 100vw;
  min-height: 100vh;
  padding-top: 48px;
  &::-webkit-scrollbar {
    display: none;
  }
  ${desktopMq} {
    padding-top: 68px;
  }
`;

export default {
  Container,
};
