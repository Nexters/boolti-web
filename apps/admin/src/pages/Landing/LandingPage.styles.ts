import styled from '@emotion/styled';
import { m } from 'framer-motion';

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
  }
`;

export default {
  Container,
  FooterContainer,
};
