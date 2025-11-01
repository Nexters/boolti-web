import styled from '@emotion/styled';
import { Swiper } from 'swiper/react';

const CoverSection = styled.div<{ isCover: boolean }>`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%;
  overflow: hidden;
  border-radius: ${({ isCover }) => (isCover ? '20px 20px 0 0' : '0')};
  :after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(18, 19, 24, 0.2) 0%, rgba(18, 19, 24, 1) 100%);
  }
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

const CoverOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
`;

const CoverBottomSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 20px 32px;
  background: #121318;
  gap: 16px;
  border-radius: 0 0 20px 20px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Nickname = styled.h1`
  ${({ theme }) => theme.typo.point.p3};
  font-weight: bold;
  color: ${({ theme }) => theme.palette.grey.g10};
`;

const UserName = styled.h1`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g50};
  margin: 0 0 16px 0;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.palette.grey.g20};
`;

const InfoIcon = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const InfoText = styled.span`
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.mobile.grey.g15};
  white-space: pre-line;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const IconButton = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.grey.w}${({ theme }) => theme.palette.opacity[20]};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.grey.w};
  transition: background-color 0.2s;
`;

const Section = styled.div`
  padding: 32px 20px 24px 20px;
`;

const Sections = styled.div`
  & > ${Section}:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g90};
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const SectionTitle = styled.h2`
  ${({ theme }) => theme.typo.sh2};
  color: ${({ theme }) => theme.palette.grey.g10};
  margin: 0;
`;

const ViewAllButton = styled.button`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g50};
  cursor: pointer;
`;

const ArrowIcon = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const ShowList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ShowCard = styled.div`
  display: flex;
  gap: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
`;

const ShowImage = styled.img`
  width: 68px;
  height: 94px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
`;

const ShowInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: center;
`;

const ShowTitle = styled.h3`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.w};
  margin: 0;
`;

const ShowDetail = styled.p`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
  margin: 0;
`;

const PastShowSlider = styled(Swiper)`
  padding-bottom: 8px;
  .swiper-slide {
    width: auto;
  }
`;

const PastShowCard = styled.div`
  flex-shrink: 0;
  width: 128px;
  cursor: pointer;
`;

const PastShowImage = styled.img`
  width: 128px;
  height: 176px;
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 8px;
`;

const PastShowTitle = styled.h4`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.mobile.grey.g05};
  margin: 0 0 4px 0;
  overflow: hidden;
`;

const PastShowDate = styled.p`
  ${({ theme }) => theme.typo.c1};
  color: ${({ theme }) => theme.palette.grey.g50};
  margin: 0;
`;

const VideoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const VideoCard = styled.a`
  display: flex;
  gap: 12px;
  cursor: pointer;
`;

const VideoThumbnailWrapper = styled.div`
  flex: 1 0 0;
`;

const VideoInfo = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const VideoDuration = styled.p`
  ${({ theme }) => theme.typo.c1};
  color: ${({ theme }) => theme.palette.grey.g50};
  margin: 0;
`;

const VideoThumbnail = styled.img`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
  object-fit: cover;
`;

const VideoTitle = styled.p`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.w};
`;

const LinkList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const LinkItem = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background-color: ${({ theme }) => theme.palette.mobile.grey.g90};
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s;
`;

const LinkTitle = styled.span`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.mobile.grey.g15};
`;

const BottomCTA = styled.div`
  padding: 16px 20px;

  @media (min-width: 481px) {
    max-width: 480px;
    margin: 0 auto;
  }
`;

const CTAButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: #fff;
  color: ${({ theme }) => theme.palette.grey.g90};
  border: none;
  border-radius: 8px;
  ${({ theme }) => theme.typo.sh1};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  transition: background-color 0.2s;
`;

const IconButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const NetetralButton = styled.button`
  padding: 7px 14px;
  background-color: ${({ theme }) => theme.palette.grey.g90};
  color: #fff;
  border: none;
  border-radius: 8px;
  ${({ theme }) => theme.typo.sh1};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.2s;
`;

export default {
  CoverSection,
  CoverImage,
  CoverOverlay,
  CoverBottomSection,
  ProfileInfo,
  Nickname,
  UserName,
  InfoRow,
  InfoIcon,
  InfoText,
  ActionButtons,
  IconButton,
  Sections,
  Section,
  SectionHeader,
  SectionTitle,
  ViewAllButton,
  ArrowIcon,
  ShowList,
  ShowCard,
  ShowImage,
  ShowInfo,
  ShowTitle,
  ShowDetail,
  PastShowSlider,
  PastShowCard,
  PastShowImage,
  PastShowTitle,
  PastShowDate,
  VideoList,
  VideoCard,
  VideoThumbnailWrapper,
  VideoDuration,
  VideoThumbnail,
  VideoTitle,
  VideoInfo,
  LinkList,
  LinkItem,
  LinkTitle,
  BottomCTA,
  CTAButton,
  IconButtonWrapper,
  NetetralButton,
};
