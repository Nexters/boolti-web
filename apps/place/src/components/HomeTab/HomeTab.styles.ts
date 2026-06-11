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

const PhotoItem = styled.div`
  position: relative;
  aspect-ratio: 1 / 1;
  border: 1px solid ${({ theme }) => theme.palette.mobile.grey.g85};
  border-radius: 8px;
  overflow: hidden;
`;

const PhotoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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

const AddressLine = styled.p`
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.palette.mobile.grey.g30};
  word-break: break-word;
`;

const CopyButton = styled.button`
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.palette.mobile.status.link};
  cursor: pointer;
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
  CopyButton,
};
