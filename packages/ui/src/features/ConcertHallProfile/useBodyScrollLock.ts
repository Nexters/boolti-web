import { useEffect } from 'react';

let bodyScrollLockCount = 0;
let previousBodyOverflow = '';

/** Keeps body scrolling locked until the last nested consumer releases its lock. */
export const useBodyScrollLock = (locked: boolean) => {
  useEffect(() => {
    if (!locked) {
      return;
    }

    if (bodyScrollLockCount === 0) {
      previousBodyOverflow = document.body.style.overflow;
    }

    bodyScrollLockCount += 1;
    document.body.style.overflow = 'hidden';

    return () => {
      bodyScrollLockCount = Math.max(0, bodyScrollLockCount - 1);

      if (bodyScrollLockCount === 0) {
        document.body.style.overflow = previousBodyOverflow;
      }
    };
  }, [locked]);
};
