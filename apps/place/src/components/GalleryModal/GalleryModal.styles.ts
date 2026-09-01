import styled from '@emotion/styled';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.mobile.grey.g95};
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 680px;
  height: 100dvh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  height: 56px;
  padding: 0 8px;
  flex-shrink: 0;
`;

const HeaderButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  color: ${({ theme }) => theme.palette.mobile.grey.g10};
  cursor: pointer;
`;

const HeaderTitle = styled.h1`
  margin-left: 4px;
  font-size: 18px;
  font-weight: 600;
  line-height: 26px;
  color: ${({ theme }) => theme.palette.mobile.grey.g10};
`;

const HeaderSpacer = styled.div`
  flex: 1;
`;

// 사진 목록 (3열 그리드)
/*
  스크롤 컨테이너를 grid와 분리한다.
  한 엘리먼트에 flex: 1(확정 높이) + overflow-y: auto + display: grid를 함께 걸면
  아이템의 aspect-ratio가 행 트랙 높이에 반영되지 않아 행이 실제 아이템보다
  작게 잡히고, 아이템이 다음 행을 침범해 사진 사이 상하 간격이 사라진다.
*/
const GridScroll = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  align-content: start;
  padding-bottom: 20px;
`;

const GridItem = styled.button`
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background-color: ${({ theme }) => theme.palette.mobile.grey.g85};
  cursor: pointer;
`;

const GridImage = styled.img`
  width: 100%;
  height: 100%;
  /* 원본 비율을 유지하고 남는 상하/좌우는 GridItem 배경이 채운다 (크롭 금지) */
  object-fit: contain;
`;

// 사진 크게 보기 (가로 스크롤 캐러셀)
const ViewerBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

const Carousel = styled.div`
  flex: 1;
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Slide = styled.div`
  flex: 0 0 100%;
  scroll-snap-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
`;

const SlideImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const Dots = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 48px;
  flex-shrink: 0;
`;

const Dot = styled.span<{ active: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${({ theme, active }) =>
    active ? theme.palette.mobile.grey.w : theme.palette.mobile.grey.g60};
  transition: background-color 0.2s ease;
`;

export default {
  Overlay,
  Inner,
  Header,
  HeaderButton,
  HeaderTitle,
  HeaderSpacer,
  GridScroll,
  Grid,
  GridItem,
  GridImage,
  ViewerBody,
  Carousel,
  Slide,
  SlideImage,
  Dots,
  Dot,
};
