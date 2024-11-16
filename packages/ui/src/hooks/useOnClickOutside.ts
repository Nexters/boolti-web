import { RefObject, useEffect } from 'react';

type Event = MouseEvent | TouchEvent;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void,
  options: { skipWhenParentElementSame?: boolean } = {},
) => {
  const { skipWhenParentElementSame } = options;
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;
      const isSameParent = el?.parentElement === (event.target as Node).parentElement;
      if (
        !el ||
        el.contains((event?.target as Node) || null) ||
        (skipWhenParentElementSame && isSameParent)
      ) {
        return;
      }

      handler(event); // Call the handler only if the click is outside of the element passed.
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]); // Reload only if ref or handler changes
};
