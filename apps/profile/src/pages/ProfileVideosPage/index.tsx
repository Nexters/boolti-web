import Styled from './ProfileVideosPage.styles';
import { BooltiIcon } from '@boolti/icon';
import Header from '~/components/Header';
import Layout from '~/components/Layout';

const VIDEOS = [
  {
    id: 1,
    title: "[TUNE's Halloween Party] Love is Dangerous : Salty&Sweet | Band Cover",
    duration: '03:32',
    thumbnail: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef',
  },
  {
    id: 2,
    title: "[TUNE's Halloween Party] 새벽별 : Salty&Sweet | Band Cover",
    duration: '04:41',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745',
  },
  {
    id: 3,
    title: "[TUNE's Halloween Party] 사랑의 달인 : Salty&Sweet | Band Cover",
    duration: '04:05',
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
  },
  {
    id: 5,
    title: "[TUNE's Halloween Party] Back light : Salty&Sweet | Band Cover",
    duration: '03:32',
    thumbnail: 'https://images.unsplash.com/photo-1464375117522-1311d6a5b81f',
  },
];

export const ProfileVideosPage = () => {
  return (
    <Layout>
      <Header title="동영상" />
      <Styled.Container>
        {VIDEOS.map((video) => (
          <Styled.VideoItem key={video.id}>
            <Styled.ThumbnailWrapper>
              {video.thumbnail ? (
                <Styled.Thumbnail src={video.thumbnail} alt={video.title} />
              ) : (
                <BooltiIcon />
              )}
            </Styled.ThumbnailWrapper>
            <Styled.VideoInfo>
              <Styled.Title>{video.title}</Styled.Title>
              <Styled.Duration>{video.duration}</Styled.Duration>
            </Styled.VideoInfo>
          </Styled.VideoItem>
        ))}
      </Styled.Container>
    </Layout>
  );
};
