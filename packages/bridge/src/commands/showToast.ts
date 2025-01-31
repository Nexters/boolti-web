import { sendCommand } from './sendCommand';

export enum TOAST_DURATIONS {
  /**
   * 10초
   */
  SHORT = 'SHORT',
  /**
   * 4초
   */
  LONG = 'LONG',
}

export type ShowToastRequestData = {
  message: string;
  duration: TOAST_DURATIONS;
};

export const showToast = (data: ShowToastRequestData) => {
  return sendCommand({ command: 'SHOW_TOAST', data });
};
