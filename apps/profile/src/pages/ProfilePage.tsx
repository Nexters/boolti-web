import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShareIcon, CalendarIcon, MapMarkerIcon, UserIcon, CurvedArrowRightIcon } from '@boolti/icon';

const DUMMY_UPCOMING_SHOWS = [
  {
    id: 1,
    title: '2025 TOGETHE LUCKY CLUB',
    date: '2025.03.20 (목) 19:00',
    location: '홍대 벨로주',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    title: "TUNE Project Vol. 2 TUNE's Halloween Party",
    date: '2024.10.31 (목) 19:00',
    location: '홍대 라이브홀',
    image: 'https://via.placeholder.com/150',
  },
];

const DUMMY_PAST_SHOWS = [
  { id: 1, title: '2024 TOGETHE LUCKY CLUB', date: '2024.10.30', image: 'https://via.placeholder.com/120' },
  { id: 2, title: '2024 BIT LUCKY CLUB', date: '2024.09.15', image: 'https://via.placeholder.com/120' },
  { id: 3, title: '2024 TOGETHE', date: '2024.08.20', image: 'https://via.placeholder.com/120' },
  { id: 4, title: '2024 TOGETHE LUCKY CLUB', date: '2024.07.10', image: 'https://via.placeholder.com/120' },
  { id: 5, title: '2024 BIT LUCKY', date: '2024.06.05', image: 'https://via.placeholder.com/120' },
];

const DUMMY_VIDEOS = [
  {
    id: 1,
    title: "[TUN's 1] Halloween Party Live in Daybreak I Scary Enemy",
    thumbnail: 'https://via.placeholder.com/200x120',
  },
  {
    id: 2,
    title: "[TUN's Halloween Party] 1편 - Scary Enemy I 2편 - La La Crow",
    thumbnail: 'https://via.placeholder.com/200x120',
  },
  {
    id: 3,
    title: "[TUN's 3] Halloween Party] 1편 5 - Scary Enemy I 2편 - La Crow",
    thumbnail: 'https://via.placeholder.com/200x120',
  },
];

const DUMMY_LINKS = [
  { id: 1, title: 'COLOREDBUTLUCKY 유튜브', url: '#' },
  { id: 2, title: 'TUNE-LIKE-COVER] 유튜브', url: '#' },
  { id: 3, title: 'TUNEPLUG 인스타', url: '#' },
];

const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();

  return (
    <>
      <Helmet>
        <title>{username} - 불티 프로필</title>
        <meta name="description" content={`${username}의 불티 프로필 페이지입니다.`} />
        <meta property="og:title" content={`${username} - 불티 프로필`} />
        <meta property="og:description" content={`${username}의 불티 프로필 페이지입니다.`} />
      </Helmet>

      <Container>
        <ContentWrapper>
          {/* 커버 이미지 & 프로필 정보 */}
          <CoverSection>
          <CoverImage src="https://via.placeholder.com/400x500" alt="cover" />
          <CoverOverlay>
            <ProfileInfo>
              <Nickname>{username}</Nickname>
              <InfoRow>
                <InfoIcon><CalendarIcon /></InfoIcon>
                <InfoText>공연일: 2025년 3월 ~ 4월</InfoText>
              </InfoRow>
              <InfoRow>
                <InfoIcon><MapMarkerIcon /></InfoIcon>
                <InfoText>위치: 홍대 라이브홀 ~ 이태원 클럽</InfoText>
              </InfoRow>
              <InfoRow>
                <InfoIcon><UserIcon /></InfoIcon>
                <InfoText>주최자: 홍길동 ~ 김철수</InfoText>
              </InfoRow>
            </ProfileInfo>
            <ActionButtons>
              <IconButton>
                <ShareIcon />
              </IconButton>
              <IconButton>❤️</IconButton>
            </ActionButtons>
          </CoverOverlay>
        </CoverSection>

        {/* 다가오는 공연 */}
        <Section>
          <SectionHeader>
            <SectionTitle>다가오는 공연</SectionTitle>
            <ViewAllButton>
              모두 보기
              <ArrowIcon><CurvedArrowRightIcon /></ArrowIcon>
            </ViewAllButton>
          </SectionHeader>
          <ShowList>
            {DUMMY_UPCOMING_SHOWS.map((show) => (
              <ShowCard key={show.id}>
                <ShowImage src={show.image} alt={show.title} />
                <ShowInfo>
                  <ShowTitle>{show.title}</ShowTitle>
                  <ShowDetail>{show.date}</ShowDetail>
                  <ShowDetail>{show.location}</ShowDetail>
                </ShowInfo>
              </ShowCard>
            ))}
          </ShowList>
        </Section>

        {/* 지난 공연 */}
        <Section>
          <SectionHeader>
            <SectionTitle>지난 공연</SectionTitle>
            <ViewAllButton>
              모두 보기
              <ArrowIcon><CurvedArrowRightIcon /></ArrowIcon>
            </ViewAllButton>
          </SectionHeader>
          <HorizontalScrollContainer>
            {DUMMY_PAST_SHOWS.map((show) => (
              <PastShowCard key={show.id}>
                <PastShowImage src={show.image} alt={show.title} />
                <PastShowTitle>{show.title}</PastShowTitle>
                <PastShowDate>{show.date}</PastShowDate>
              </PastShowCard>
            ))}
          </HorizontalScrollContainer>
        </Section>

        {/* 동영상 */}
        <Section>
          <SectionHeader>
            <SectionTitle>동영상</SectionTitle>
            <ViewAllButton>
              모두 보기
              <ArrowIcon><CurvedArrowRightIcon /></ArrowIcon>
            </ViewAllButton>
          </SectionHeader>
          <VideoList>
            {DUMMY_VIDEOS.map((video) => (
              <VideoCard key={video.id}>
                <VideoThumbnail src={video.thumbnail} alt={video.title} />
                <VideoTitle>{video.title}</VideoTitle>
              </VideoCard>
            ))}
          </VideoList>
        </Section>

        {/* 링크 */}
        <Section>
          <SectionHeader>
            <SectionTitle>링크</SectionTitle>
            <ViewAllButton>
              모두 보기
              <ArrowIcon><CurvedArrowRightIcon /></ArrowIcon>
            </ViewAllButton>
          </SectionHeader>
          <LinkList>
            {DUMMY_LINKS.map((link) => (
              <LinkItem key={link.id}>
                <LinkIcon>🔗</LinkIcon>
                <LinkTitle>{link.title}</LinkTitle>
              </LinkItem>
            ))}
          </LinkList>
        </Section>

        {/* 하단 CTA */}
        <BottomCTA>
          <CTAButton>
            <CTAIcon>📩</CTAIcon>
            이 프로필을 받아 봐 계세요?
          </CTAButton>
        </BottomCTA>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default ProfilePage;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.palette.grey.b};
  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 480px;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.palette.grey.g100};
  position: relative;
`;

// 커버 섹션
const CoverSection = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CoverOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px 20px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Nickname = styled.h1`
  ${({ theme }) => theme.typo.h2};
  color: ${({ theme }) => theme.palette.grey.w};
  margin: 0 0 8px 0;
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
  ${({ theme }) => theme.typo.c1};
  color: ${({ theme }) => theme.palette.grey.g20};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const IconButton = styled.button`
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

  &:hover {
    background-color: ${({ theme }) => theme.palette.grey.w}${({ theme }) => theme.palette.opacity[30]};
  }
`;

// 섹션 공통
const Section = styled.section`
  padding: 32px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g90};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  ${({ theme }) => theme.typo.h1};
  color: ${({ theme }) => theme.palette.grey.w};
  margin: 0;
`;

const ViewAllButton = styled.button`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g40};
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.palette.grey.g30};
  }
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

// 다가오는 공연
const ShowList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ShowCard = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  background-color: ${({ theme }) => theme.palette.grey.g90};
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.palette.grey.g80};
  }
`;

const ShowImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
`;

const ShowInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
`;

const ShowTitle = styled.h3`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.w};
  margin: 0;
`;

const ShowDetail = styled.p`
  ${({ theme }) => theme.typo.c1};
  color: ${({ theme }) => theme.palette.grey.g40};
  margin: 0;
`;

// 지난 공연 (가로 스크롤)
const HorizontalScrollContainer = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 8px;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.palette.grey.g80};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.palette.grey.g60};
    border-radius: 2px;
  }
`;

const PastShowCard = styled.div`
  flex-shrink: 0;
  width: 120px;
  cursor: pointer;
`;

const PastShowImage = styled.img`
  width: 120px;
  height: 160px;
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 8px;
`;

const PastShowTitle = styled.h4`
  ${({ theme }) => theme.typo.sh0};
  color: ${({ theme }) => theme.palette.grey.w};
  margin: 0 0 4px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PastShowDate = styled.p`
  ${({ theme }) => theme.typo.c1};
  color: ${({ theme }) => theme.palette.grey.g40};
  margin: 0;
`;

// 동영상
const VideoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const VideoCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
`;

const VideoThumbnail = styled.img`
  width: 100%;
  height: 180px;
  border-radius: 8px;
  object-fit: cover;
`;

const VideoTitle = styled.h4`
  ${({ theme }) => theme.typo.sh0};
  color: ${({ theme }) => theme.palette.grey.w};
  margin: 0;
  line-height: 1.4;
`;

// 링크
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
  background-color: ${({ theme }) => theme.palette.grey.g90};
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.palette.grey.g80};
  }
`;

const LinkIcon = styled.div`
  font-size: 20px;
`;

const LinkTitle = styled.span`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.w};
`;

// 하단 CTA
const BottomCTA = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 20px;
  background-color: ${({ theme }) => theme.palette.grey.g100};
  border-top: 1px solid ${({ theme }) => theme.palette.grey.g80};
  z-index: 10;
  
  @media (min-width: 481px) {
    max-width: 480px;
    margin: 0 auto;
  }
`;

const CTAButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: ${({ theme }) => theme.palette.primary.o1};
  color: ${({ theme }) => theme.palette.grey.w};
  border: none;
  border-radius: 8px;
  ${({ theme }) => theme.typo.sh1};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.o2};
  }
`;

const CTAIcon = styled.span`
  font-size: 20px;
`;
