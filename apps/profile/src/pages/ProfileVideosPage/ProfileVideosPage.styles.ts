import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 0px;
`;

const VideoItem = styled.a`
  display: flex;
  gap: 16px;
  align-items: flex-start;
  text-decoration: none;
  cursor: pointer;
`;

const ThumbnailWrapper = styled.div`
  width: 160px;
  aspect-ratio: 16 / 9;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.palette.mobile.grey.g85};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 36px;
    height: 36px;
    color: ${({ theme }) => theme.palette.grey.g40};
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const VideoInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const Title = styled.p`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.mobile.grey.g05};
  margin: 0;
  line-height: 1.4;
`;

const Duration = styled.p`
  ${({ theme }) => theme.typo.c1};
  color: ${({ theme }) => theme.palette.grey.g40};
  margin: 0;
`;

export default {
  Container,
  VideoItem,
  ThumbnailWrapper,
  Thumbnail,
  VideoInfo,
  Title,
  Duration,
};
