import { useQuery, type UseQueryResult } from '@tanstack/react-query';

interface YouTubeVideoResponse {
  items?: Array<{
    contentDetails?: {
      duration?: string;
    };
  }>;
}

export const useYoutubeVideoDuration = (
  videoId: string | null,
): UseQueryResult<string | null, Error> => {
  return useQuery({
    queryKey: ['youtube', 'duration', videoId],
    queryFn: async (): Promise<string | null> => {
      if (!videoId) return null;

      const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
      if (!apiKey) {
        console.warn('YouTube API key is not configured');
        return null;
      }

      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${apiKey}`,
        );

        if (!response.ok) {
          throw new Error('Failed to fetch video duration');
        }

        const data: YouTubeVideoResponse = await response.json();
        return data.items?.[0]?.contentDetails?.duration ?? null;
      } catch (error) {
        console.error('Error fetching YouTube video duration:', error);
        return null;
      }
    },
    enabled: !!videoId,
    staleTime: 1000 * 60 * 60 * 24, // 24시간 캐싱
    retry: 1,
  });
};
