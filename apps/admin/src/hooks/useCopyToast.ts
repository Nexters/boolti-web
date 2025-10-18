import { useEffect, useState } from 'react';

const COPY_TOAST_DURATION = 2000;

export const useCopyToast = (copyFn: () => void, duration: number = COPY_TOAST_DURATION) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timerId = setTimeout(() => {
        setIsCopied(false);
      }, duration);
      return () => clearTimeout(timerId);
    }
  }, [isCopied, duration]);

  const handleCopy = () => {
    copyFn();
    setIsCopied(true);
  };

  return { isCopied, handleCopy };
};
