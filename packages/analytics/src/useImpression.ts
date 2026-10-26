import { useEffect, useRef } from 'react';

/**
 * 요소가 화면에 처음 보였을 때 한 번만 onImpression 을 호출한다.
 * enabled 가 false 이면 관찰하지 않는다.
 */
export const useImpression = <T extends Element>(
  onImpression: () => void,
  { enabled = true, threshold = 0.1 }: { enabled?: boolean; threshold?: number } = {},
) => {
  const ref = useRef<T>(null);
  const callbackRef = useRef(onImpression);
  const hasImpressedRef = useRef(false);

  callbackRef.current = onImpression;

  useEffect(() => {
    const element = ref.current;
    if (!enabled || !element || hasImpressedRef.current) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasImpressedRef.current) return;
        hasImpressedRef.current = true;
        callbackRef.current();
        observer.disconnect();
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [enabled, threshold]);

  return ref;
};
