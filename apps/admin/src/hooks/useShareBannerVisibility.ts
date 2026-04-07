import { useCallback, useEffect, useRef, useState } from 'react';
import { useScrollDirection } from './useScrollDirection';

const BANNER_DISMISS_KEY = 'share_banner_dismissed_at';
const DWELL_TIME_THRESHOLD = 10000; // 10초
const SCROLL_PROGRESS_THRESHOLD = 0.5; // 50%

export const useShareBannerVisibility = () => {
  const scrollDirection = useScrollDirection();

  const [hasMetDwellTime, setHasMetDwellTime] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 하루 미노출 체크
  const isDismissedToday = useCallback((): boolean => {
    const dismissedAt = localStorage.getItem(BANNER_DISMISS_KEY);
    if (!dismissedAt) return false;

    const dismissedDate = new Date(parseInt(dismissedAt, 10));
    const today = new Date();

    return (
      dismissedDate.getFullYear() === today.getFullYear() &&
      dismissedDate.getMonth() === today.getMonth() &&
      dismissedDate.getDate() === today.getDate()
    );
  }, []);

  // 하루 미노출 설정
  const dismissForToday = useCallback(() => {
    localStorage.setItem(BANNER_DISMISS_KEY, Date.now().toString());
    setIsDismissed(true);
  }, []);

  useEffect(() => {
    setIsDismissed(isDismissedToday());
  }, [isDismissedToday]);

  // 체류 시간 타이머
  useEffect(() => {
    if (hasMetDwellTime) return;

    timerRef.current = setTimeout(() => {
      setHasMetDwellTime(true);
    }, DWELL_TIME_THRESHOLD);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [hasMetDwellTime]);

  // 스크롤 진행률 추적
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const maxScroll = scrollHeight - viewportHeight;

      if (maxScroll <= 0) {
        setScrollProgress(0);
        return;
      }

      const progress = scrollY / maxScroll;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  // 조건 충족 여부 (OR 조건)
  const hasMetCondition = hasMetDwellTime || scrollProgress >= SCROLL_PROGRESS_THRESHOLD;

  // 최종 배너 표시 여부
  const isVisible = hasMetCondition && scrollDirection === 'down' && !isDismissed;

  return {
    isVisible,
    dismissForToday,
  };
};
