import { useYoutubeVideoDuration } from '@boolti/api';
import { formatYoutubeDuration, getYoutubeThumbnailUrl, getYoutubeVideoId } from '~/utils';
import Styled from './VideoCard.styles';
import { BooltiDarkIcon, BooltiDarkLogo } from '@boolti/icon';

interface VideoCardProps {
  videoUrl: string;
}

const VideoCard = ({ videoUrl }: VideoCardProps) => {
  const videoId = getYoutubeVideoId(videoUrl) as string;
  const { data } = useYoutubeVideoDuration(videoId);
  const thumbnailUrl = videoId ? getYoutubeThumbnailUrl(videoId) : null;

  const formattedDuration = formatYoutubeDuration(data?.duration ?? null);

  return (
    <Styled.VideoCard href={videoUrl} target="_blank" rel="noopener noreferrer">
      <Styled.VideoThumbnailWrapper>
        {thumbnailUrl ? (
          <Styled.VideoThumbnail src={thumbnailUrl} alt="YouTube video" />
        ) : (
          <>
            <BooltiDarkIcon />
            <BooltiDarkLogo />
          </>
        )}
      </Styled.VideoThumbnailWrapper>
      <Styled.VideoInfo>
        <Styled.VideoTitle>{data?.title ?? '알 수 없는 동영상'}</Styled.VideoTitle>
        <Styled.VideoDuration>{data?.duration ? formattedDuration : '-'}</Styled.VideoDuration>
      </Styled.VideoInfo>
    </Styled.VideoCard>
  );
};

export default VideoCard;
