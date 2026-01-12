import { useParams } from 'react-router-dom';
import Styled from './ProfileVideosPage.styles';
import { BooltiDarkIcon, BooltiDarkLogo } from '@boolti/icon';
import Header from '~/components/Header';
import Layout from '~/components/Layout';
import { useUserVideos, useYoutubeVideoDuration } from '@boolti/api';
import { getYoutubeVideoId, getYoutubeThumbnailUrl, formatYoutubeDuration } from '~/utils';

interface VideoItemProps {
  videoUrl: string;
}

export const ProfileVideosPage = () => {
  const { userCode } = useParams<{ userCode: string }>();
  const { data } = useUserVideos(userCode as string);

  return (
    <Layout>
      <Header title="동영상" />
      <Styled.CountText>전체 ({data?.length || 0})</Styled.CountText>
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
    <Styled.VideoItem
      {...(data ? { href: videoUrl, target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <Styled.ThumbnailWrapper>
        {thumbnailUrl ? (
          <Styled.Thumbnail src={thumbnailUrl} alt="YouTube video" />
        ) : (
          <>
            <BooltiDarkIcon />
            <BooltiDarkLogo />
          </>
        )}
      </Styled.ThumbnailWrapper>
      <Styled.VideoInfo>
        <Styled.Title>{data?.title ?? '알 수 없는 동영상'}</Styled.Title>
        <Styled.Duration>{data?.duration ? formattedDuration : '-'}</Styled.Duration>
      </Styled.VideoInfo>
    </Styled.VideoItem>
  );
};
