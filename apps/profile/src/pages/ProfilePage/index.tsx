import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { InstagramIcon, YoutubeIcon, ChainLink, BooltiIcon, ShareIcon } from '@boolti/icon';
import { SwiperSlide } from 'swiper/react';
import { BottomSheet } from '@boolti/ui';
import Header from '~/components/Header';
import Styled from './ProfilePage.styles';
import Layout from '~/components/Layout';
import { useUserByUserCodeV2 } from '@boolti/api';
import {
  formatDateTimeWithWeekday,
  formatDateWithWeekday,
  getYoutubeVideoId,
  getYoutubeThumbnailUrl,
} from '~/utils';
import { Meta } from '~/components/Meta';
import { PROFILE_URL } from '~/constants/url';

const ProfilePage = () => {
  const { userCode } = useParams<{ userCode: string }>();
  const navigate = useNavigate();
  const [isShareBottomSheetOpen, setIsShareBottomSheetOpen] = useState(false);

  const { data: profile } = useUserByUserCodeV2(userCode as string);

  if (!profile) {
    return (
      <Layout>
        <Styled.CoverSection isCover={false}>
          <Styled.CoverImage
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgQChENDRAPDQ8QDQ0NEBANDQ8NDQ8PFBEWFhUdExMZHCggGBolGxUTITEhJSkrLi42Fx85ODMsNygtLisBCgoKDg0OFxAQFS4dICU3NSsrLS0rMC0rLSstKzctLSs1Ky03KystNS0rKy0tLS0rKysrKzc3LS03KysrKysrN//AABEIAOAA4QMBIgACEQEDEQH/xAAaAAEBAQADAQAAAAAAAAAAAAAAAQUCBAYD/8QAMRABAAIAAwYCCQUBAQAAAAAAAAECAwQRBRIhMUFRMnEiYXKRkqGxweEzQlKB0SMU/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAEDAgQF/8QAHhEBAQEBAAIDAQEAAAAAAAAAAAECEQMxIUFREhP/2gAMAwEAAhEDEQA/APVgr6L5qCoKKIIoAAAAAAAAAAAAAIKAgoCCgIKAgoCKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAKogCiKAAIAAAAAAAAAAAACAqiAKIAogAqAgAKAAKigACAAAAA5Uw72nSsTPlGr71yGYnpEecwlsiyWusO1Oz8x2ifK0PhiYOLXxVmP64e87DlcAFQABABQAAAAAAAQAFAAFRQABAACIno0crs+OeJ8P8Arns7KxEb9uc8vVDustb+o1zj7qVrERpEREdo4KDNqAA6eZyFLcaejPb9s/4y71tE6TGkw9A62dy0XrrHijl6/U0zv9Z6x+McBqxQAUAAAAAAAEABQABUUAAQfbJ4W/ixHTnPlD4tDZFeNreUOdXkdZna0QGD0AAAAAAMjaWFu4uscrcf76uq1Nq1/wCcT2t9YZbfN7GG5yoA6cgAAAAAAAAAAACooAAg09k+C3tR9GY72yr6XmveNfc536d49tMBg3AAAAAAdXaf6M+1VkNLa1/RrX17zNbY9MN+0AduQAAAAAAAQAFAAFRQABBywsSa3i0c4nVxBW/h3rasWjlMauTHyWamk6TxrPylr1tExrE6xPWGGs8b511QHLoAAJmIjWeEDLz+c3vQp4es9/wsnXOtcdfNY2/iTbpyjyfIG7BAFAAAAAAAAQAFAAFRQABAAB9cDMYlJ9GeHWJ5S+Qi9auFtHCnxa1n3w7FcfBnlavvhhI5uI7nkrfnGwo52r8UPhi5/AjlO9Pq/wBY6p/nC+SuxmM5iX4eGvaPu64O5OOLegCogAoAAAAAAAIACgACooAAgPtl8tiXnhwjrM8mngZPCpx03p7z9nN1I7zm1mYWUxrcq6R3nhDt4ezP5W+GPu0Bnd1pMR1a7Py8dJnzmXOMnl/4R833HPa6/mfj4/8Ajy/8I+bhbIZeekx5TLsh2n8z8Z99mR+23xQ6uLk8evONY714todTdc3EeeG1j5TCvzjSe8cJ/LMzOVxKc+Ne8fdpNSs9YsdcB05AAAAAAABAAUAAVFAdvJZOb+lbhX52/Djkctv21nwxz9c9mxEQz3rnxHeM9+aViIjSOER0gBk2AAAAAAAACYjTSeIAy89kt306eHrHb8Oi9GyNoZXdner4Z+Utca+qy1n7jpgNGYAAAAAIACgADlSk2tFY5zOji0NlYWtpvPThHmlvIsna7+Dh1rSKx0+cuYPO9AAAAAAAAAAAACuOJStqzWeUxo5Ajz+PhTS81np84cGntbC9GLx04T5dGY3zexhqcoA6QAAAEABQABt5Gm7g19cb3vYkRxehrGkRHaIhn5Gnj9qAyagAAAAAAAAAAAKAI4Y9N7DtXvE+9596N5/MV0xLR2tP1aeNn5HABqzAAABAAUABywvHX2o+r0Dz+F46+1X6vQMvI18f2AM2gAAAAAAAAAAACgCDCzv69/a+zdYee/Xv5/Z34/bjfp8AGzIAAAB//9k="
            alt="기본 프로필"
          />
          <Styled.CoverOverlay>
            <Styled.ProfileInfo>
              <Styled.Nickname>닉네임</Styled.Nickname>
              <Styled.UserName>@{userCode}</Styled.UserName>
            </Styled.ProfileInfo>
          </Styled.CoverOverlay>
        </Styled.CoverSection>
      </Layout>
    );
  }

  const instagramAccount = profile.sns.find((sns) => sns.type === 'INSTAGRAM');
  const youtubeAccount = profile.sns.find((sns) => sns.type === 'YOUTUBE');

  return (
    <>
      <Meta
        nickname={profile.nickname}
        introduction={profile.introduction}
        imgPath={profile.imgPath}
      />
      <Layout>
        <Header
          rightButton={
            <button type="button" onClick={() => setIsShareBottomSheetOpen(true)}>
              <ShareIcon />
            </button>
          }
        />
        <Styled.CoverSection isCover={!!profile.imgPath}>
          <Styled.CoverImage
            src={profile.imgPath || 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d'}
            alt={`${profile.nickname} 프로필`}
          />
          <Styled.CoverOverlay>
            <Styled.ProfileInfo>
              <Styled.Nickname>{profile.nickname}</Styled.Nickname>
              <Styled.UserName>@{profile.userCode}</Styled.UserName>
            </Styled.ProfileInfo>
          </Styled.CoverOverlay>
        </Styled.CoverSection>

        <Styled.CoverBottomSection>
          <Styled.InfoText>{profile.introduction}</Styled.InfoText>
          <Styled.ActionButtons>
            {instagramAccount?.username && (
              <Styled.IconButton
                href={`https://instagram.com/${instagramAccount.username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon />
              </Styled.IconButton>
            )}
            {youtubeAccount?.username && (
              <Styled.IconButton
                href={`https://youtube.com/@${youtubeAccount.username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <YoutubeIcon />
              </Styled.IconButton>
            )}
          </Styled.ActionButtons>
        </Styled.CoverBottomSection>

        <Styled.Sections>
          {profile.comingSoonShow.isVisible && profile.comingSoonShow.totalSize > 0 && (
            <Styled.Section>
              <Styled.SectionHeader>
                <Styled.SectionTitle>다가오는 공연</Styled.SectionTitle>
              </Styled.SectionHeader>
              <Styled.ShowList>
                {profile.comingSoonShow.previewItems.map((show) => (
                  <Styled.ShowCard key={show.id}>
                    <Styled.ShowImage src={show.showImg} alt={show.name} />
                    <Styled.ShowInfo>
                      <Styled.ShowTitle>{show.name}</Styled.ShowTitle>
                      <Styled.ShowDetail>{formatDateTimeWithWeekday(show.date)}</Styled.ShowDetail>
                    </Styled.ShowInfo>
                  </Styled.ShowCard>
                ))}
              </Styled.ShowList>
            </Styled.Section>
          )}

          {profile.performedShow.isVisible && profile.performedShow.totalSize > 0 && (
            <Styled.Section>
              <Styled.SectionHeader>
                <Styled.SectionTitle>지난 공연</Styled.SectionTitle>
                {profile.performedShow.hasMoreItems && (
                  <Styled.ViewAllButton onClick={() => navigate('shows')}>
                    전체 보기
                  </Styled.ViewAllButton>
                )}
              </Styled.SectionHeader>
              <Styled.PastShowSlider spaceBetween={12} slidesPerView={'auto'}>
                {profile.performedShow.previewItems.map((show) => (
                  <SwiperSlide key={show.id}>
                    <Styled.PastShowCard>
                      <Styled.PastShowImage src={show.showImg} alt={show.name} />
                      <Styled.PastShowTitle>{show.name}</Styled.PastShowTitle>
                      <Styled.PastShowDate>{formatDateWithWeekday(show.date)}</Styled.PastShowDate>
                    </Styled.PastShowCard>
                  </SwiperSlide>
                ))}
              </Styled.PastShowSlider>
            </Styled.Section>
          )}

          {profile.video.totalSize > 0 && (
            <Styled.Section>
              <Styled.SectionHeader>
                <Styled.SectionTitle>영상</Styled.SectionTitle>
                {profile.video.hasMoreItems && (
                  <Styled.ViewAllButton onClick={() => navigate('videos')}>
                    전체 보기
                  </Styled.ViewAllButton>
                )}
              </Styled.SectionHeader>
              <Styled.VideoList>
                {profile.video.previewItems.map((videoUrl, index) => {
                  const videoId = getYoutubeVideoId(videoUrl);
                  const thumbnailUrl = videoId
                    ? getYoutubeThumbnailUrl(videoId)
                    : 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d';

                  return (
                    <Styled.VideoCard
                      key={videoId || index}
                      href={videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Styled.VideoThumbnailWrapper>
                        <Styled.VideoThumbnail src={thumbnailUrl} alt="YouTube video" />
                      </Styled.VideoThumbnailWrapper>
                      <Styled.VideoInfo>
                        <Styled.VideoTitle>YouTube 영상</Styled.VideoTitle>
                      </Styled.VideoInfo>
                    </Styled.VideoCard>
                  );
                })}
              </Styled.VideoList>
            </Styled.Section>
          )}

          {profile.link.totalSize > 0 && (
            <Styled.Section>
              <Styled.SectionHeader>
                <Styled.SectionTitle>링크</Styled.SectionTitle>
                {profile.link.hasMoreItems && (
                  <Styled.ViewAllButton onClick={() => navigate('links')}>
                    전체 보기
                  </Styled.ViewAllButton>
                )}
              </Styled.SectionHeader>
              <Styled.LinkList>
                {profile.link.previewItems.map((link, index) => (
                  <Styled.LinkItem
                    key={`${link.link}-${index}`}
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ChainLink />
                    <Styled.LinkTitle>{link.title}</Styled.LinkTitle>
                  </Styled.LinkItem>
                ))}
              </Styled.LinkList>
            </Styled.Section>
          )}
        </Styled.Sections>

        <Styled.BottomCTA>
          <Styled.CTAButton>
            <Styled.IconButtonWrapper>
              <BooltiIcon /> 이 프로필은 불티로 제작되었습니다
            </Styled.IconButtonWrapper>
            <Styled.NetetralButton>나도 만들기</Styled.NetetralButton>
          </Styled.CTAButton>
        </Styled.BottomCTA>

        <BottomSheet open={isShareBottomSheetOpen} onClose={() => setIsShareBottomSheetOpen(false)}>
          <BottomSheet.MenuItem
            onClick={() => {
              navigator.clipboard.writeText(`${PROFILE_URL}${userCode}`);
              setIsShareBottomSheetOpen(false);
            }}
          >
            URL만 공유하기
          </BottomSheet.MenuItem>
          <BottomSheet.MenuItem
            onClick={() => {
              const shareText = [
                '이 아티스트 어때요?',
                '',
                `- 닉네임 : #${profile.nickname}`,
                `- 크레딧 : 참여 공연 #${profile.performedShow.totalSize}`,
                '프로필 ▼',
                `${PROFILE_URL}${userCode}`,
              ].join('\n');
              navigator.clipboard.writeText(shareText);
              setIsShareBottomSheetOpen(false);
            }}
          >
            아티스트 정보 함께 공유하기
          </BottomSheet.MenuItem>
        </BottomSheet>
      </Layout>
    </>
  );
};

export default ProfilePage;
