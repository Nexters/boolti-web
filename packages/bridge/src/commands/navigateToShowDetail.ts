import { Command } from '../types';
import { sendCommand } from './sendCommand';
import { getBaseCommand } from './utils';

export type NavigateToShowDetailRequestData = { showId: number };

export const navigateToShowDetail = (data: NavigateToShowDetailRequestData) => {
  const command: Command<NavigateToShowDetailRequestData> = {
    ...getBaseCommand('NAVIGATE_TO_SHOW_DETAIL'),
    data,
  };

  return sendCommand<NavigateToShowDetailRequestData>(command);
};
