import { useParams } from 'react-router-dom';
import Styled from './ProfileVideosPage.styles';
import { BooltiIcon } from '@boolti/icon';
import Header from '~/components/Header';
import Layout from '~/components/Layout';
import { useUserVideos } from '@boolti/api';
import { getYoutubeVideoId, getYoutubeThumbnailUrl } from '~/utils';

export const ProfileVideosPage = () => {
  const { userCode } = useParams<{ userCode: string }>();
  const { data } = useUserVideos(userCode as string);

  return (
    <Layout>
      <Header title="동영상" />
      <Styled.Container>
        {data?.map((videoUrl, index) => {
          const videoId = getYoutubeVideoId(videoUrl);
          const thumbnailUrl = videoId ? getYoutubeThumbnailUrl(videoId) : null;

          return (
            <Styled.VideoItem
              key={videoId || index}
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Styled.ThumbnailWrapper>
                {thumbnailUrl ? (
                  <Styled.Thumbnail src={thumbnailUrl} alt="YouTube video" />
                ) : (
                  <BooltiIcon />
                )}
              </Styled.ThumbnailWrapper>
              <Styled.VideoInfo>
                <Styled.Title>YouTube 영상</Styled.Title>
              </Styled.VideoInfo>
            </Styled.VideoItem>
          );
        })}
      </Styled.Container>
    </Layout>
  );
};
