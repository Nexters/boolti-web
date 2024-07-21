import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(#121215, #434753);
  margin: 0 auto;
`;

const GiftWrapper = styled.section`
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoint.mobile};
  background: linear-gradient(#121215, #434753);
  position: relative;
  padding: 0 20px;
`;

export default {
  Container,
  GiftWrapper,
};
