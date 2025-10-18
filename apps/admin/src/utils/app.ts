export const navigateToAppScheme = async (appScheme: string) => {
  let timerId: ReturnType<typeof setTimeout>;

  return new Promise((resolve) => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearTimeout(timerId);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        resolve(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

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

      resolve(false);
    }, 1_000);
  });
};
