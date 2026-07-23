import styled from '@emotion/styled';

// 모바일 웹뷰 기준 화면. 데스크탑에서는 최대 너비를 고정하고 가운데 정렬한다.
const Container = styled.div<{ fillViewport: boolean }>`
  display: flex;
  justify-content: center;
  width: 100%;
  ${({ fillViewport }) => fillViewport && 'min-height: 100dvh;'}
  background-color: ${({ theme }) => theme.palette.mobile.grey.g95};
`;

const ContentWrapper = styled.div<{ fillViewport: boolean }>`
  position: relative;
  width: 100%;
  max-width: 680px;
  ${({ fillViewport }) => fillViewport && 'min-height: 100dvh;'}
  background-color: ${({ theme }) => theme.palette.mobile.grey.g95};
`;

interface Props {
  children: React.ReactNode;
  // 네이티브 앱이 콘텐츠 높이에 맞춰 웹뷰 프레임을 리사이즈하는 임베드 페이지에서는
  // min-height: 100dvh가 "그 시점의 웹뷰 프레임 높이"를 기준으로 계산되어, 한 번 늘어난
  // 높이 아래로는 다시 줄어들지 못하는 피드백 루프를 만든다. 이런 페이지는 false로 끈다.
  fillViewport?: boolean;
}

const Layout = ({ children, fillViewport = true }: Props) => (
  <Container fillViewport={fillViewport}>
    <ContentWrapper fillViewport={fillViewport}>{children}</ContentWrapper>
  </Container>
);

export default Layout;
