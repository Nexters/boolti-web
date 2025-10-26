import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { InstagramIcon, YoutubeIcon, ChainLink, BooltiIcon, ShareIcon } from '@boolti/icon';
import { SwiperSlide } from 'swiper/react';
import Header from '~/components/Header';

import {
  CoverSection,
  CoverImage,
  CoverOverlay,
  CoverBottomSection,
  ProfileInfo,
  Nickname,
  UserName,
  ActionButtons,
  IconButton,
  Sections,
  Section,
  SectionHeader,
  SectionTitle,
  InfoText,
  ViewAllButton,
  ShowList,
  ShowCard,
  ShowImage,
  ShowInfo,
  ShowTitle,
  ShowDetail,
  PastShowCard,
  PastShowImage,
  PastShowTitle,
  PastShowDate,
  PastShowSlider,
  VideoList,
  VideoCard,
  VideoInfo,
  VideoThumbnail,
  VideoDuration,
  VideoTitle,
  VideoThumbnailWrapper,
  LinkList,
  LinkItem,
  LinkTitle,
  BottomCTA,
  CTAButton,
} from './ProfilePage.styles';
import Layout from '~/components/Layout';
import { useUserByUserCodeV2 } from '@boolti/api';

const DUMMY_UPCOMING_SHOWS = [
  {
    id: 1,
    title: '2025 TOGETHE LUCKY CLUB',
    date: '2025.03.20 (목) 19:00',
    location: '홍대 벨로주',
    image: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
  },
  {
    id: 2,
    title: "TUNE Project Vol. 2 TUNE's Halloween Party",
    date: '2024.10.31 (목) 19:00',
    location: '홍대 라이브홀',
    image: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
  },
];

const DUMMY_PAST_SHOWS = [
  {
    id: 1,
    title: '2024 TOGETHE LUCKY CLUB',
    date: '2024.10.30',
    image: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
  },
  {
    id: 2,
    title: '2024 BIT LUCKY CLUB',
    date: '2024.09.15',
    image: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
  },
  {
    id: 3,
    title: '2024 TOGETHE',
    date: '2024.08.20',
    image: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
  },
  {
    id: 4,
    title: '2024 TOGETHE LUCKY CLUB',
    date: '2024.07.10',
    image: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
  },
  {
    id: 5,
    title: '2024 BIT LUCKY',
    date: '2024.06.05',
    image: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
  },
];

const DUMMY_VIDEOS = [
  {
    id: 1,
    title: "[TUN's 1] Halloween Party Live in Daybreak I Scary Enemy",
    duration: '23:45',
    thumbnail: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
  },
  {
    id: 2,
    title: "[TUN's Halloween Party] 1편 - Scary Enemy I 2편 - La La Crow",
    duration: '23:45',
    thumbnail: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
  },
  {
    id: 3,
    title: "[TUN's 3] Halloween Party] 1편 5 - Scary Enemy I 2편 - La Crow",
    duration: '23:45',
    thumbnail: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
  },
];

const DUMMY_LINKS = [
  { id: 1, title: 'COLOREDBUTLUCKY 유튜브', url: '#' },
  { id: 2, title: 'TUNE-LIKE-COVER] 유튜브', url: '#' },
  { id: 3, title: 'TUNEPLUG 인스타', url: '#' },
];

const ProfilePage = () => {
  const { userCode } = useParams<{ userCode: string }>();
  const navigate = useNavigate();

  if (!userCode) {
    console.log('error');
  }

  const { data: profile } = useUserByUserCodeV2(userCode);

  return (
    <>
      <Helmet>
        <title>{userCode} - 불티 프로필</title>
        <meta name="description" content={`${userCode}의 불티 프로필 페이지입니다.`} />
        <meta property="og:title" content={`${userCode} - 불티 프로필`} />
        <meta property="og:description" content={`${userCode}의 불티 프로필 페이지입니다.`} />
      </Helmet>

      <Layout>
        <Header rightButton={<ShareIcon />} />
        <CoverSection>
          <CoverImage
            src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d"
            alt="cover"
          />
          <CoverOverlay>
            <ProfileInfo>
              <Nickname>{profile?.nickname}</Nickname>
              <UserName>@hey__sunn</UserName>
            </ProfileInfo>
          </CoverOverlay>
        </CoverSection>

        <CoverBottomSection>
          <InfoText> 소개소개</InfoText>
          <ActionButtons>
            <IconButton>
              <InstagramIcon />
            </IconButton>
            <IconButton>
              <YoutubeIcon />
            </IconButton>
          </ActionButtons>
        </CoverBottomSection>

        <Sections>
          <Section>
            <SectionHeader>
              <SectionTitle>다가오는 공연</SectionTitle>
            </SectionHeader>
            <ShowList>
              {DUMMY_UPCOMING_SHOWS.map((show) => (
                <ShowCard key={show.id}>
                  <ShowImage src={show.image} alt={show.title} />
                  <ShowInfo>
                    <ShowTitle>{show.title}</ShowTitle>
                    <ShowDetail>{show.date}</ShowDetail>
                  </ShowInfo>
                </ShowCard>
              ))}
            </ShowList>
          </Section>

          <Section>
            <SectionHeader>
              <SectionTitle>지난 공연</SectionTitle>
              <ViewAllButton onClick={() => navigate('shows')}>전체 보기</ViewAllButton>
            </SectionHeader>
            <PastShowSlider spaceBetween={12} slidesPerView={'auto'}>
              {DUMMY_PAST_SHOWS.map((show) => (
                <SwiperSlide key={show.id}>
                  <PastShowCard>
                    <PastShowImage src={show.image} alt={show.title} />
                    <PastShowTitle>{show.title}</PastShowTitle>
                    <PastShowDate>{show.date}</PastShowDate>
                  </PastShowCard>
                </SwiperSlide>
              ))}
            </PastShowSlider>
          </Section>

          <Section>
            <SectionHeader>
              <SectionTitle>영상</SectionTitle>
              <ViewAllButton onClick={() => navigate('videos')}>전체 보기</ViewAllButton>
            </SectionHeader>
            <VideoList>
              {DUMMY_VIDEOS.map((video) => (
                <VideoCard key={video.id}>
                  <VideoThumbnailWrapper>
                    <VideoThumbnail src={video.thumbnail} alt={video.title} />
                  </VideoThumbnailWrapper>
                  <VideoInfo>
                    <VideoTitle>{video.title}</VideoTitle>
                    <VideoDuration>{video.duration}</VideoDuration>
                  </VideoInfo>
                </VideoCard>
              ))}
            </VideoList>
          </Section>

          <Section>
            <SectionHeader>
              <SectionTitle>링크</SectionTitle>
              <ViewAllButton onClick={() => navigate('links')}>전체 보기</ViewAllButton>
            </SectionHeader>
            <LinkList>
              {DUMMY_LINKS.map((link) => (
                <LinkItem key={link.id}>
                  <ChainLink />
                  <LinkTitle>{link.title}</LinkTitle>
                </LinkItem>
              ))}
            </LinkList>
          </Section>
        </Sections>

        <BottomCTA>
          <CTAButton>
            <BooltiIcon />이 프로필은 불티로 제작되었습니다
          </CTAButton>
        </BottomCTA>
      </Layout>
    </>
  );
};

export default ProfilePage;
