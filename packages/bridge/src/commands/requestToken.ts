import { Command } from '../types';
import { sendCommand } from './sendCommand';
import { getBaseCommand } from './utils';

export type RequestTokenResponseData = { token: string };

export const requestToken = () => {
  const command: Command = getBaseCommand('REQUEST_TOKEN');
  return sendCommand<undefined, RequestTokenResponseData>(command);
};
