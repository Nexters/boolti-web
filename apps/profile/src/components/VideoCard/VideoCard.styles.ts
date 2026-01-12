import styled from '@emotion/styled';

const VideoCard = styled.a`
  display: flex;
  gap: 12px;
  cursor: pointer;
`;

const VideoThumbnailWrapper = styled.div`
  width: 160px;
  height: 90px;
  border-radius: 4px;
  overflow: hidden;
  gap: 6px;
  background-color: ${({ theme }) => theme.palette.mobile.grey.g80};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #2e303a;
`;

const VideoInfo = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const VideoDuration = styled.p`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g50};
  margin: 0;
  padding: 2px 0px;
  border-radius: 2px;
`;

const VideoThumbnail = styled.img`
  width: 160px;
  height: 90px;
  border-radius: 4px;
  object-fit: cover;
  border: 1px solid #2e303a;
`;

const VideoTitle = styled.p`
  ${({ theme }) => theme.typo.sh1};
  color: #f6f7ff;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`;

export default {
  VideoCard,
  VideoThumbnailWrapper,
  VideoInfo,
  VideoDuration,
  VideoThumbnail,
  VideoTitle,
};
