import { sendCommand } from './sendCommand';

export type NavigateToShowDetailRequestData = { showId: number };

export const navigateToShowDetail = (data: NavigateToShowDetailRequestData) => {
  return sendCommand({ command: 'NAVIGATE_TO_SHOW_DETAIL', data });
};
