import { breakpoint } from '@boolti/ui';
import debounce from 'lodash.debounce';
import { useState, useEffect, useMemo, useCallback } from 'react';

type DeviceType = 'desktop' | 'tablet' | 'mobile';

interface UseDeviceByWidthParams {
  onChangeDeviceByWidth?: (value: DeviceType) => void;
}

const useDeviceByWidth = ({ onChangeDeviceByWidth }: UseDeviceByWidthParams) => {
  const [device, setDevice] = useState<DeviceType>('desktop');

  const updateDeviceByWidth = useCallback((value: DeviceType) => {
    if (device !== value) {
      setDevice(value);
      onChangeDeviceByWidth?.(value);
    }
  }, [device, onChangeDeviceByWidth]);

  const handleResize = useMemo(
    () => debounce(() => {
      const width = window.innerWidth;
      if (width >= parseInt(breakpoint.desktop)) {
        updateDeviceByWidth('desktop');
      } else if (width >= parseInt(breakpoint.tablet)) {
        updateDeviceByWidth('tablet');
      } else {
        updateDeviceByWidth('mobile');
      }
    }, 300),
    [updateDeviceByWidth]
  );

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return { device };
};

export default useDeviceByWidth;
