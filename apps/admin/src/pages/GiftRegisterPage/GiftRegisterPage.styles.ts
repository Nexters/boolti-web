import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoint.mobile};
  margin: 0 auto;
`;

const GiftWrapper = styled.section`
  width: 100%;
  height: 100vh;
  max-height: 812px;
  background: linear-gradient(#121215, #434753);
  position: relative;
  padding: 0 20px;
`;

export default {
  Container,
  GiftWrapper,
};
