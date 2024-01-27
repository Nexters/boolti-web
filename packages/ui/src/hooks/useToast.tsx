import { useTheme } from '@emotion/react';
import { useCallback } from 'react';
import { ErrorIcon, toast } from 'react-hot-toast';
import { InfoIcon, SuccessIcon, WarningIcon } from '../components/Toast/icons';

interface ToastOptions {
  duration?: number;
}

const DEFAULT_DURATION = 3000;

const useToast = () => {
  const theme = useTheme();

  const success = useCallback(
    (message: string, options?: ToastOptions) => {
      const duration = options?.duration ?? DEFAULT_DURATION;

      return toast(message, {
        icon: <SuccessIcon />,
        style: {
          border: '1px solid #C3ECC2',
          backgroundColor: 'rgba(239, 250, 239, 0.95)',
          boxShadow: '0px 4px 15px 0px rgba(0, 0, 0, 0.15)',
          color: theme.palette.grey.g90,
        },
        duration,
      });
    },
    [theme],
  );

  const warning = useCallback(
    (message: string, options?: ToastOptions) => {
      const duration = options?.duration ?? DEFAULT_DURATION;

      return toast(message, {
        icon: <WarningIcon />,
        style: {
          border: '1px solid #FCEACE',
          backgroundColor: 'rgba(254, 250, 243, 0.95)',
          boxShadow: '0px 4px 15px 0px rgba(0, 0, 0, 0.15)',
          color: theme.palette.grey.g90,
        },
        duration,
      });
    },
    [theme],
  );

  const error = useCallback(
    (message: string, options?: ToastOptions) => {
      const duration = options?.duration ?? DEFAULT_DURATION;

      return toast(message, {
        icon: <ErrorIcon />,
        style: {
          border: '1px solid #FACBCF',
          backgroundColor: 'rgba(254, 248, 248, 0.95)',
          boxShadow: '0px 4px 15px 0px rgba(0, 0, 0, 0.15)',
          color: theme.palette.grey.g90,
        },
        duration,
      });
    },
    [theme],
  );

  const info = useCallback(
    (message: string, options?: ToastOptions) => {
      const duration = options?.duration ?? DEFAULT_DURATION;

      return toast(message, {
        icon: <InfoIcon />,
        style: {
          border: '1px solid #C6E0FF',
          background: 'rgba(239, 245, 255, 0.95)',
          boxShadow: '0px 4px 15px 0px rgba(0, 0, 0, 0.15)',
          color: theme.palette.grey.g90,
        },
        duration,
      });
    },
    [theme],
  );

  return {
    success,
    warning,
    error,
    info,
  };
};

export default useToast;
