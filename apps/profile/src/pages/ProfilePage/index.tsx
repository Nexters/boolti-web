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
import {
  formatDateTimeWithWeekday,
  formatDateWithWeekday,
  getYoutubeVideoId,
  getYoutubeThumbnailUrl,
} from '~/utils';

const ProfilePage = () => {
  const { userCode } = useParams<{ userCode: string }>();
  const navigate = useNavigate();

  if (!userCode) {
    console.log('error');
  }

  const { data: profile } = useUserByUserCodeV2(userCode as string);

  if (!profile) {
    return null;
  }

  const instagramAccount = profile.sns.find((sns) => sns.type === 'INSTAGRAM');
  const youtubeAccount = profile.sns.find((sns) => sns.type === 'YOUTUBE');

  return (
    <>
      <Helmet>
        <title>{profile.nickname} - 불티 프로필</title>
        <meta
          name="description"
          content={profile.introduction || `${profile.nickname}의 불티 프로필 페이지입니다.`}
        />
        <meta property="og:title" content={`${profile.nickname} - 불티 프로필`} />
        <meta
          property="og:description"
          content={profile.introduction || `${profile.nickname}의 불티 프로필 페이지입니다.`}
        />
        {profile.imgPath && <meta property="og:image" content={profile.imgPath} />}
      </Helmet>

      <Layout>
        <Header rightButton={<ShareIcon />} />
        <CoverSection>
          <CoverImage
            src={profile.imgPath || 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d'}
            alt={`${profile.nickname} 프로필`}
          />
          <CoverOverlay>
            <ProfileInfo>
              <Nickname>{profile.nickname}</Nickname>
              <UserName>@{profile.userCode}</UserName>
            </ProfileInfo>
          </CoverOverlay>
        </CoverSection>

        <CoverBottomSection>
          <InfoText>{profile.introduction}</InfoText>
          <ActionButtons>
            {instagramAccount?.username && (
              <IconButton
                href={`https://instagram.com/${instagramAccount.username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon />
              </IconButton>
            )}
            {youtubeAccount?.username && (
              <IconButton
                href={`https://youtube.com/@${youtubeAccount.username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <YoutubeIcon />
              </IconButton>
            )}
          </ActionButtons>
        </CoverBottomSection>

        <Sections>
          {profile.comingSoonShow.isVisible && profile.comingSoonShow.totalSize > 0 && (
            <Section>
              <SectionHeader>
                <SectionTitle>다가오는 공연</SectionTitle>
              </SectionHeader>
              <ShowList>
                {profile.comingSoonShow.previewItems.map((show) => (
                  <ShowCard key={show.id}>
                    <ShowImage src={show.showImg} alt={show.name} />
                    <ShowInfo>
                      <ShowTitle>{show.name}</ShowTitle>
                      <ShowDetail>{formatDateTimeWithWeekday(show.date)}</ShowDetail>
                    </ShowInfo>
                  </ShowCard>
                ))}
              </ShowList>
            </Section>
          )}

          {profile.performedShow.isVisible && profile.performedShow.totalSize > 0 && (
            <Section>
              <SectionHeader>
                <SectionTitle>지난 공연</SectionTitle>
                {profile.performedShow.hasMoreItems && (
                  <ViewAllButton onClick={() => navigate('shows')}>전체 보기</ViewAllButton>
                )}
              </SectionHeader>
              <PastShowSlider spaceBetween={12} slidesPerView={'auto'}>
                {profile.performedShow.previewItems.map((show) => (
                  <SwiperSlide key={show.id}>
                    <PastShowCard>
                      <PastShowImage src={show.showImg} alt={show.name} />
                      <PastShowTitle>{show.name}</PastShowTitle>
                      <PastShowDate>{formatDateWithWeekday(show.date)}</PastShowDate>
                    </PastShowCard>
                  </SwiperSlide>
                ))}
              </PastShowSlider>
            </Section>
          )}

          {profile.video.totalSize > 0 && (
            <Section>
              <SectionHeader>
                <SectionTitle>영상</SectionTitle>
                {profile.video.hasMoreItems && (
                  <ViewAllButton onClick={() => navigate('videos')}>전체 보기</ViewAllButton>
                )}
              </SectionHeader>
              <VideoList>
                {profile.video.previewItems.map((videoUrl, index) => {
                  const videoId = getYoutubeVideoId(videoUrl);
                  const thumbnailUrl = videoId
                    ? getYoutubeThumbnailUrl(videoId)
                    : 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d';

                  return (
                    <VideoCard
                      key={videoId || index}
                      href={videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <VideoThumbnailWrapper>
                        <VideoThumbnail src={thumbnailUrl} alt="YouTube video" />
                      </VideoThumbnailWrapper>
                      <VideoInfo>
                        <VideoTitle>YouTube 영상</VideoTitle>
                      </VideoInfo>
                    </VideoCard>
                  );
                })}
              </VideoList>
            </Section>
          )}

          {profile.link.totalSize > 0 && (
            <Section>
              <SectionHeader>
                <SectionTitle>링크</SectionTitle>
                {profile.link.hasMoreItems && (
                  <ViewAllButton onClick={() => navigate('links')}>전체 보기</ViewAllButton>
                )}
              </SectionHeader>
              <LinkList>
                {profile.link.previewItems.map((link, index) => (
                  <LinkItem
                    key={`${link.link}-${index}`}
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ChainLink />
                    <LinkTitle>{link.title}</LinkTitle>
                  </LinkItem>
                ))}
              </LinkList>
            </Section>
          )}
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
