import styled from '@emotion/styled';

// 모바일 웹뷰 기준 화면. 데스크탑에서는 최대 너비를 고정하고 가운데 정렬한다.
const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100dvh;
  background-color: ${({ theme }) => theme.palette.mobile.grey.g95};
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 680px;
  min-height: 100dvh;
  background-color: ${({ theme }) => theme.palette.mobile.grey.g95};
`;

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
  <Container>
    <ContentWrapper>{children}</ContentWrapper>
  </Container>
);

export default Layout;
