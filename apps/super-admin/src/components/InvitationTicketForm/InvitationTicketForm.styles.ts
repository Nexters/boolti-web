import styled from '@emotion/styled';

const Container = styled.div``;

const Description = styled.p`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g70};
`;

export default { Container, Description };
