import { useQuery, type UseQueryResult } from '@tanstack/react-query';

interface YouTubeVideoResponse {
  items?: Array<{
    snippet?: {
      title?: string;
    };
    contentDetails?: {
      duration?: string;
    };
  }>;
}

export interface YouTubeVideoData {
  title: string | null;
  duration: string | null;
}

const useYoutubeVideoDuration = (
  videoId: string | null,
): UseQueryResult<YouTubeVideoData, Error> => {
  return useQuery({
    queryKey: ['youtube', 'video', videoId],
    queryFn: async (): Promise<YouTubeVideoData> => {
      if (!videoId) return { title: null, duration: null };

      const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
      if (!apiKey) {
        return { title: null, duration: null };
      }

      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails&key=${apiKey}`,
        );

        if (!response.ok) {
          throw new Error('Failed to fetch video data');
        }

        const data: YouTubeVideoResponse = await response.json();
        return {
          title: data.items?.[0]?.snippet?.title ?? null,
          duration: data.items?.[0]?.contentDetails?.duration ?? null,
        };
      } catch (error) {
        return { title: null, duration: null };
      }
    },
    enabled: !!videoId,
    staleTime: 1000 * 60 * 60 * 24,
    retry: 1,
  });
};

export default useYoutubeVideoDuration;
