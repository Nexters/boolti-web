import { useTheme } from '@emotion/react';
import { useMemo } from 'react';
import { ErrorIcon, toast } from 'react-hot-toast';

import { InfoIcon, SuccessIcon, WarningIcon } from '../components/Toast/icons';

interface ToastOptions {
  duration?: number;
}

type ToastFunction = (message: string, options?: ToastOptions) => ReturnType<typeof toast>;

const DEFAULT_DURATION = 3000;

const useToast = () => {
  const theme = useTheme();

  const toastVariables = useMemo(
    () =>
      ({
        success: {
          icon: <SuccessIcon />,
          style: {
            border: '1px solid #C3ECC2',
            backgroundColor: 'rgba(239, 250, 239, 0.95)',
            boxShadow: '0px 4px 15px 0px rgba(0, 0, 0, 0.15)',
            color: theme.palette.grey.g90,
          },
        },
        warning: {
          icon: <WarningIcon />,
          style: {
            border: '1px solid #FCEACE',
            backgroundColor: 'rgba(254, 250, 243, 0.95)',
            boxShadow: '0px 4px 15px 0px rgba(0, 0, 0, 0.15)',
            color: theme.palette.grey.g90,
          },
        },
        error: {
          icon: <ErrorIcon />,
          style: {
            border: '1px solid #FACBCF',
            backgroundColor: 'rgba(254, 248, 248, 0.95)',
            boxShadow: '0px 4px 15px 0px rgba(0, 0, 0, 0.15)',
            color: theme.palette.grey.g90,
          },
        },
        info: {
          icon: <InfoIcon />,
          style: {
            border: '1px solid #C6E0FF',
            background: 'rgba(239, 245, 255, 0.95)',
            boxShadow: '0px 4px 15px 0px rgba(0, 0, 0, 0.15)',
            color: theme.palette.grey.g90,
          },
        },
      }) as const,
    [theme.palette.grey.g90],
  );

  return Object.entries(toastVariables).reduce(
    (acc: Record<string, ToastFunction>, [key, variables]) => ({
      ...acc,
      [key]: (message: string, options?: ToastOptions) => {
        const duration = options?.duration ?? DEFAULT_DURATION;

        return toast(message, {
          ...variables,
          duration,
        });
      },
    }),
    {},
  ) as Record<keyof typeof toastVariables, ToastFunction>;
};

export default useToast;
