import { type RefObject, useLayoutEffect, useState } from 'react';

// 웹뷰는 첫 렌더 시점에 너비가 좁게 잡혔다가 늘어나기도 해서, 한 번만 재면 짧은 내용도 넘친다고 오판한다.
// 크기가 바뀔 때마다 다시 잰다. (접힌 상태여도 scrollHeight는 전체 내용 높이라 그대로 비교할 수 있다)
const useIsOverflowing = (ref: RefObject<HTMLElement>, maxHeight: number) => {
  const [isOverflowing, setIsOverflowing] = useState(false);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const measure = () => setIsOverflowing(element.scrollHeight > maxHeight);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(element);
    if (element.firstElementChild) {
      observer.observe(element.firstElementChild);
    }

    return () => observer.disconnect();
  }, [ref, maxHeight]);

  return isOverflowing;
};

export default useIsOverflowing;
