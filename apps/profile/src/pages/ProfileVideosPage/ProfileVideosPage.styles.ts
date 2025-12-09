import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 20px;

  ${mq_lg} {
    padding: 20px 0;
  }
`;

const VideoItem = styled.a`
  display: flex;
  gap: 16px;
  text-decoration: none;
  cursor: pointer;
`;

const ThumbnailWrapper = styled.div`
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

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const VideoInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.p`
  ${({ theme }) => theme.typo.sh1};
  color: #f6f7ff;
  margin: 0;
  line-height: 1.4;
`;

const Duration = styled.p`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g40};
  margin: 0;
`;

const CountText = styled.p`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g50};
  margin: 0 0 8px 0;
`;

export default {
  Container,
  VideoItem,
  ThumbnailWrapper,
  Thumbnail,
  VideoInfo,
  Title,
  Duration,
  CountText,
};
