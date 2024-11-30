import { useLayoutEffect } from 'react';

export const useBodyScrollLock = (enabled: boolean = true) => {
  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (enabled) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [enabled]);
};
