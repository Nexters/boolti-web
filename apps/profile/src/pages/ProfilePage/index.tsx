import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  InstagramIcon,
  YoutubeIcon,
  ChainLink,
  BooltiIcon,
  ShareIcon,
  BooltiGreyLogo,
} from '@boolti/icon';
import { SwiperSlide } from 'swiper/react';
import { BottomSheet, useDialog } from '@boolti/ui';
import { Global } from '@emotion/react';
import Header from '~/components/Header';
import Styled, { bottomSheetOverrides } from './ProfilePage.styles';
import Layout from '~/components/Layout';
import { useUserByUserCodeV2 } from '@boolti/api';
import { formatDateTimeWithWeekday, formatDateWithWeekday } from '~/utils';
import { Meta } from '~/components/Meta';
import { PROFILE_URL } from '~/constants/url';
import { EXTERNAL_URL } from '~/constants/external';
import VideoCard from '~/components/VideoCard';
import NotFound from '~/components/Notfound';
import { QRCodeSVG } from 'qrcode.react';

const ProfilePage = () => {
  const dialog = useDialog();
  const { userCode } = useParams<{ userCode: string }>();
  const navigate = useNavigate();
  const [isShareBottomSheetOpen, setIsShareBottomSheetOpen] = useState(false);
  const [isShareDropdownOpen, setIsShareDropdownOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const { data: profile } = useUserByUserCodeV2(userCode as string);

  const getPreviewLink = (showId: number) => {
    return `${window.location.origin}/show/${showId}`;
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    if (isShareDropdownOpen) {
      const handleClickOutside = () => setIsShareDropdownOpen(false);
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isShareDropdownOpen]);

  const handleShareButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDesktop) {
      setIsShareDropdownOpen(!isShareDropdownOpen);
    } else {
      setIsShareBottomSheetOpen(true);
    }
  };

  const handleShareUrlCopy = () => {
    navigator.clipboard.writeText(`${PROFILE_URL}${userCode}`);
    setIsShareBottomSheetOpen(false);
    setIsShareDropdownOpen(false);
  };

  const handleShareDetailCopy = () => {
    if (!profile) return;
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
    setIsShareDropdownOpen(false);
  };

  const getStoreLink = () => {
    const isAndroid = /android/i.test(navigator.userAgent);

    return isAndroid
      ? 'https://play.google.com/store/apps/details?id=com.nexters.boolti&hl=ko'
      : 'https://apps.apple.com/kr/app/불티/id6476589322';
  };

  const reservationButtonClickHandler = (isDesktop: boolean) => {
    if (!isDesktop) return;

    dialog.open({
      title: '불티 앱에서 예매하기',
      content: (
        <Styled.DialogContainer>
          <Styled.DialogQRCodeContainer>
            <Styled.QRCodeContainer>
              <QRCodeSVG value={getStoreLink()} size={182} level="H" />
            </Styled.QRCodeContainer>
            <BooltiGreyLogo />
          </Styled.DialogQRCodeContainer>
          <Styled.DialogTitle>
            불티 앱에서
            <br />
            핫한 공연을 예매하세요!
          </Styled.DialogTitle>
          <Styled.DialogDescription>
            휴대폰 카메라로 QR코드를 찍어 앱을 다운로드 받아요
          </Styled.DialogDescription>
        </Styled.DialogContainer>
      ),
    });
  };

  if (!profile) {
    return <NotFound />;
  }

  const instagramAccount = profile.sns.find((sns) => sns.type === 'INSTAGRAM');
  const youtubeAccount = profile.sns.find((sns) => sns.type === 'YOUTUBE');

  return (
    <>
      <Global styles={bottomSheetOverrides} />
      <Meta
        nickname={profile.nickname}
        introduction={profile.introduction}
        imgPath={profile.imgPath}
      />
      <Layout>
        {isDesktop && (
          <Header
            rightButton={
              <Styled.ShareDropdownButton type="button" onClick={handleShareButtonClick}>
                <ShareIcon />
                {isShareDropdownOpen && (
                  <Styled.ShareDropdown>
                    <Styled.ShareDropdownItem onClick={handleShareUrlCopy}>
                      URL만 공유하기
                    </Styled.ShareDropdownItem>
                    <Styled.ShareDropdownItem onClick={handleShareDetailCopy}>
                      아티스트 정보 함께 공유하기
                    </Styled.ShareDropdownItem>
                  </Styled.ShareDropdown>
                )}
              </Styled.ShareDropdownButton>
            }
          />
        )}
        <Styled.CoverSection isCover={!!profile.imgPath} isDesktop={isDesktop}>
          {!isDesktop && (
            <Styled.ShareDropdownButton
              isMobileInCover
              type="button"
              onClick={handleShareButtonClick}
            >
              <ShareIcon />
            </Styled.ShareDropdownButton>
          )}
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
              <Styled.IconButton href={`https://instagram.com/${instagramAccount.username}`}>
                <InstagramIcon />
              </Styled.IconButton>
            )}
            {youtubeAccount?.username && (
              <Styled.IconButton href={`https://youtube.com/@${youtubeAccount.username}`}>
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
                  <Styled.ShowCard key={show.id} href={EXTERNAL_URL.SHOW_MANAGER_INFO(show.id)}>
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
            <Styled.PastShowSection>
              <Styled.PastSectionHeader>
                <Styled.SectionTitle>지난 공연</Styled.SectionTitle>
                {profile.performedShow.hasMoreItems && (
                  <Styled.ViewAllButton onClick={() => navigate('shows')}>
                    전체 보기
                  </Styled.ViewAllButton>
                )}
              </Styled.PastSectionHeader>
              <Styled.PastShowSlider spaceBetween={16} slidesPerView={'auto'}>
                {profile.performedShow.previewItems.map((show) => (
                  <SwiperSlide key={show.id}>
                    <Styled.PastShowCard href={EXTERNAL_URL.SHOW_MANAGER_INFO(show.id)}>
                      <Styled.PastShowImage src={show.showImg} alt={show.name} />
                      <Styled.PastShowTitle>
                        {show.name.length > 10 ? `${show.name.slice(0, 10)}...` : show.name}
                      </Styled.PastShowTitle>
                      <Styled.PastShowDate>{formatDateWithWeekday(show.date)}</Styled.PastShowDate>
                    </Styled.PastShowCard>
                  </SwiperSlide>
                ))}
              </Styled.PastShowSlider>
            </Styled.PastShowSection>
          )}

          {profile.video.totalSize > 0 && (
            <Styled.Section>
              <Styled.SectionHeader>
                <Styled.SectionTitle>동영상</Styled.SectionTitle>
                {profile.video.hasMoreItems && (
                  <Styled.ViewAllButton onClick={() => navigate('videos')}>
                    전체 보기
                  </Styled.ViewAllButton>
                )}
              </Styled.SectionHeader>
              <Styled.VideoList>
                {profile.video.previewItems.map((videoUrl) => (
                  <VideoCard key={videoUrl} videoUrl={videoUrl} />
                ))}
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
                  <Styled.LinkItem key={`${link.link}-${index}`} href={link.link}>
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
            <Styled.NetetralButton onClick={() => reservationButtonClickHandler(isDesktop)}>
              나도 만들기
            </Styled.NetetralButton>
          </Styled.CTAButton>
        </Styled.BottomCTA>

        {!isDesktop && (
          <BottomSheet
            open={isShareBottomSheetOpen}
            onClose={() => setIsShareBottomSheetOpen(false)}
          >
            <BottomSheet.MenuItem onClick={handleShareUrlCopy}>URL만 공유하기</BottomSheet.MenuItem>
            <BottomSheet.MenuItem onClick={handleShareDetailCopy}>
              아티스트 정보 함께 공유하기
            </BottomSheet.MenuItem>
          </BottomSheet>
        )}
      </Layout>
    </>
  );
};

export default ProfilePage;
