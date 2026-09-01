import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 12px 0;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 32px 20px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  line-height: 26px;
  color: ${({ theme }) => theme.palette.mobile.grey.g10};
`;

const IntroductionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const IntroductionText = styled.div<{ isCollapsed: boolean }>`
  position: relative;
  width: 100%;
  max-height: ${({ isCollapsed }) => (isCollapsed ? '280px' : 'none')};
  overflow: hidden;
`;

const IntroductionParagraph = styled.p`
  font-size: 15px;
  line-height: 23px;
  color: ${({ theme }) => theme.palette.mobile.grey.g30};
  word-break: break-word;
  white-space: pre-wrap;
`;

const IntroductionDim = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 80px;
  background: linear-gradient(180deg, rgba(9, 10, 11, 0) 0%, #090a0b 100%);
`;

const MoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 40px;
  padding: 0 4px;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  color: ${({ theme }) => theme.palette.mobile.grey.g10};
  cursor: pointer;
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  width: 100%;
`;

const PhotoItem = styled.button`
  position: relative;
  aspect-ratio: 1 / 1;
  border: 1px solid ${({ theme }) => theme.palette.mobile.grey.g85};
  border-radius: 8px;
  overflow: hidden;
  padding: 0;
  cursor: pointer;
  /* 정비율이 아닌 사진의 레터박스 영역 */
  background-color: ${({ theme }) => theme.palette.mobile.grey.g85};
`;

const PhotoImage = styled.img`
  width: 100%;
  height: 100%;
  /* 원본 비율을 유지하고 남는 상하/좌우는 PhotoItem 배경이 채운다 (크롭 금지) */
  object-fit: contain;
`;

const PhotoMoreOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.45);
  color: ${({ theme }) => theme.palette.mobile.grey.g10};
`;

const PhotoMoreCount = styled.span`
  font-size: 15px;
  line-height: 23px;
`;

const AmenityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 8px;
  row-gap: 4px;
  width: 100%;
`;

const AmenityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  color: ${({ theme }) => theme.palette.mobile.grey.g30};
`;

const AmenityLabel = styled.span`
  font-size: 15px;
  line-height: 23px;
  word-break: keep-all;
`;

// 터치 영역은 '복사' 글자가 아니라 주소 줄 전체다.
const AddressLine = styled.button`
  display: inline-block;
  /* Section이 flex column이라 stretch로 늘어난다. 터치 영역을 주소 길이에 맞춘다. */
  align-self: flex-start;
  max-width: 100%;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.palette.mobile.grey.g30};
  word-break: break-word;
  text-align: left;
  cursor: pointer;
  transition: opacity 0.2s;

  &:active {
    opacity: 0.7;
  }
`;

// AddressLine이 이미 button이라 중첩할 수 없다. 색만 다른 텍스트로 둔다.
const CopyLabel = styled.span`
  color: ${({ theme }) => theme.palette.mobile.status.link};
`;

export default {
  Container,
  Section,
  SectionTitle,
  IntroductionWrapper,
  IntroductionText,
  IntroductionParagraph,
  IntroductionDim,
  MoreButton,
  PhotoGrid,
  PhotoItem,
  PhotoImage,
  PhotoMoreOverlay,
  PhotoMoreCount,
  AmenityGrid,
  AmenityItem,
  AmenityLabel,
  AddressLine,
  CopyLabel,
};
