import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';

export function useDeviceWidth() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = debounce(() => {
      setWindowSize(window.innerWidth);
    }, 300);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
