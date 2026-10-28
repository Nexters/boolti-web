import { observeYouTubePlayback, trackClick } from '@boolti/analytics';
import { useEffect, useRef } from 'react';

import Styled from './ShowNoticeHtmlContent.styles';

const ShowNoticeHtmlContent: React.FC<{ content: string }> = ({ content }) => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const played = new Set<string>();
    return observeYouTubePlayback(root.current, (videoId) => {
      if (played.has(videoId)) return;
      played.add(videoId);
      trackClick('ShowDetail', 'Button', 'PlayVideo');
    });
  }, [content]);

  return <Styled.Content ref={root} dangerouslySetInnerHTML={{ __html: content }} />;
};

export default ShowNoticeHtmlContent;
