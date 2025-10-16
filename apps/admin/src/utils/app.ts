import { openStoreLink } from './link';

export const navigateToAppScheme = async (appScheme: string) => {
  let timerId: ReturnType<typeof setTimeout>;

  return new Promise((resolve) => {
    const startTime = Date.now();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearTimeout(timerId);
        document.removeEventListener('visibilitychange', handleVisibilityChange);

        resolve(true);
      }
    };

    window.addEventListener(
      'blur',
      () => {
        clearTimeout(timerId);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        resolve(true);
      },
      { once: true },
    );

    window.location.href = appScheme;

    timerId = setTimeout(() => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      const elapsedTime = Date.now() - startTime;

      if (elapsedTime < 1_500) {
        resolve(false);

        openStoreLink();
      } else {
        resolve(false);
      }
    }, 2_000);
  });
};
