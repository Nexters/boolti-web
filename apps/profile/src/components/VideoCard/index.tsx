import { useYoutubeVideoDuration } from '@boolti/api';
import { formatYoutubeDuration, getYoutubeThumbnailUrl, getYoutubeVideoId } from '~/utils';
import Styled from './VideoCard.styles';

interface VideoCardProps {
  videoUrl: string;
}

const VideoCard = ({ videoUrl }: VideoCardProps) => {
  const videoId = getYoutubeVideoId(videoUrl) as string;
  const { data } = useYoutubeVideoDuration(videoId);
  const formattedDuration = formatYoutubeDuration(data?.duration ?? null);

  return (
    <Styled.VideoCard href={videoUrl} target="_blank" rel="noopener noreferrer">
      <Styled.VideoThumbnailWrapper>
        <Styled.VideoThumbnail src={getYoutubeThumbnailUrl(videoId)} alt="YouTube video" />
      </Styled.VideoThumbnailWrapper>
      <Styled.VideoInfo>
        <Styled.VideoTitle>{data?.title ?? '알 수 없는 동영상'}</Styled.VideoTitle>
        {formattedDuration && <Styled.VideoDuration>{formattedDuration}</Styled.VideoDuration>}
      </Styled.VideoInfo>
    </Styled.VideoCard>
  );
};

export default VideoCard;
