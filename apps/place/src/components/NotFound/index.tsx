import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  height: 290px;
  width: 100%;
`;

const Title = styled.span`
  font-family: 'SB Aggro';
  font-size: 20px;
  line-height: 30px;
  letter-spacing: -0.6px;
  color: ${({ theme }) => theme.palette.mobile.grey.g20};
`;

const Description = styled.span`
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.palette.mobile.grey.g30};
`;

const NotFound = () => (
  <Container>
    <Title>NOT FOUND</Title>
    <Description>페이지를 찾을 수 없어요.</Description>
  </Container>
);

export default NotFound;
