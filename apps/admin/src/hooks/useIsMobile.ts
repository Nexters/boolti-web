import { useTheme } from '@emotion/react';
import { useDeviceWidth } from './useDeviceWidth';

export function useIsMobile() {
  const deviceWidth = useDeviceWidth();
  const theme = useTheme();
  const isMobile = deviceWidth < parseInt(theme.breakpoint.mobile, 10);

  return isMobile;
}
