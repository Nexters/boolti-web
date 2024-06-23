import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoint.mobile};
  margin: 0 auto;
`;

export default {
  Container,
};
