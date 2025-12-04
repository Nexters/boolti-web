import { useParams } from 'react-router-dom';
import Styled from './ProfileVideosPage.styles';
import { BooltiIcon } from '@boolti/icon';
import Header from '~/components/Header';
import Layout from '~/components/Layout';
import { useUserVideos } from '@boolti/api';
import { getYoutubeVideoId, getYoutubeThumbnailUrl, formatYoutubeDuration } from '~/utils';
import { useYoutubeVideoDuration } from '~/hooks/useYoutubeVideoDuration';

interface VideoItemProps {
  videoUrl: string;
}

export const ProfileVideosPage = () => {
  const { userCode } = useParams<{ userCode: string }>();
  const { data } = useUserVideos(userCode as string);

  return (
    <Layout>
      <Header title="동영상" />
      <Styled.Container>
        {data?.map((videoUrl, index) => <VideoItem key={videoUrl || index} videoUrl={videoUrl} />)}
      </Styled.Container>
    </Layout>
  );
};

const VideoItem = ({ videoUrl }: VideoItemProps) => {
  const videoId = getYoutubeVideoId(videoUrl);
  const thumbnailUrl = videoId ? getYoutubeThumbnailUrl(videoId) : null;
  const { data } = useYoutubeVideoDuration(videoId);
  const formattedDuration = formatYoutubeDuration(data?.duration ?? null);

  return (
    <Styled.VideoItem href={videoUrl} target="_blank" rel="noopener noreferrer">
      <Styled.ThumbnailWrapper>
        {thumbnailUrl ? (
          <Styled.Thumbnail src={thumbnailUrl} alt="YouTube video" />
        ) : (
          <BooltiIcon />
        )}
      </Styled.ThumbnailWrapper>
      <Styled.VideoInfo>
        <Styled.Title>{data?.title ?? 'YouTube 영상'}</Styled.Title>
        {formattedDuration && <Styled.Duration>{formattedDuration}</Styled.Duration>}
      </Styled.VideoInfo>
    </Styled.VideoItem>
  );
};
