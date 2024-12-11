import { sendCommand } from './sendCommand';

export const navigateBack = () => {
  return sendCommand({ command: 'NAVIGATE_BACK' });
};
