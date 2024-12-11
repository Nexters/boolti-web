import { Command } from '../types';
import { sendCommand } from './sendCommand';
import { getBaseCommand } from './utils';

export const navigateBack = () => {
  const command: Command = getBaseCommand('NAVIGATE_BACK');
  return sendCommand(command);
};
