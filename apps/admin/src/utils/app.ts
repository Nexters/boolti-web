export const navigateToAppScheme = async (appScheme: string): Promise<boolean> => {
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

    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = appScheme;
    document.body.appendChild(iframe);

    timerId = setTimeout(() => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.body.removeChild(iframe);
      resolve(false);
    }, 1_000);
  });
};
