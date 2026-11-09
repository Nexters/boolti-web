type Player = { destroy: () => void };
type YouTubeAPI = {
  Player: new (
    iframe: HTMLIFrameElement,
    options: {
      events: { onStateChange: (event: { data: number }) => void };
    },
  ) => Player;
};
declare global {
  interface Window {
    YT?: YouTubeAPI;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let loading: Promise<YouTubeAPI> | undefined;
const loadAPI = () => {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (loading) return loading;
  loading = new Promise<YouTubeAPI>((resolve, reject) => {
    const previousReady = window.onYouTubeIframeAPIReady;
    const script = document.createElement('script');
    const fail = () => {
      clearTimeout(timeout);
      script.remove();
      window.onYouTubeIframeAPIReady = previousReady;
      loading = undefined;
      reject(new Error('YouTube IFrame API unavailable'));
    };
    const timeout = setTimeout(fail, 15000);
    window.onYouTubeIframeAPIReady = () => {
      clearTimeout(timeout);
      try {
        previousReady?.();
      } finally {
        if (window.YT?.Player) resolve(window.YT);
        else fail();
      }
    };
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    script.onerror = fail;
    document.head.appendChild(script);
  });
  return loading;
};

export const observeYouTubePlayback = (
  root: HTMLElement,
  onPlayback: (videoId: string) => void,
) => {
  let disposed = false;
  const players: Player[] = [];
  const embeds = Array.from(root.querySelectorAll('iframe')).flatMap((iframe) => {
    try {
      const url = new URL(iframe.src);
      if (
        url.protocol !== 'https:' ||
        !['www.youtube.com', 'www.youtube-nocookie.com'].includes(url.hostname)
      )
        return [];
      const match = /^\/embed\/([\w-]+)$/.exec(url.pathname);
      if (!match) return [];
      return [{ iframe, url, videoId: match[1] }];
    } catch {
      return [];
    }
  });
  if (embeds.length) {
    // Reconfigure once, before attaching the API; leave the player UI intact.
    embeds.forEach(({ iframe, url }) => {
      url.searchParams.set('enablejsapi', '1');
      url.searchParams.set('origin', location.origin);
      url.searchParams.set('autoplay', '0');
      if (iframe.src !== url.href) iframe.src = url.href;
    });
    void loadAPI()
      .then((api) => {
        if (disposed) return;
        embeds.forEach(({ iframe, videoId }) => {
          if (!iframe.isConnected) return;
          players.push(
            new api.Player(iframe, {
              events: {
                onStateChange: ({ data }) => {
                  if (!disposed && data === 1) onPlayback(videoId);
                },
              },
            }),
          );
        });
      })
      .catch(() => {
        // API blocking must not prevent the existing embedded player from working.
      });
  }
  return () => {
    disposed = true;
    players.forEach((player) => {
      try {
        player.destroy();
      } catch {
        /* The iframe may already have unmounted. */
      }
    });
  };
};
