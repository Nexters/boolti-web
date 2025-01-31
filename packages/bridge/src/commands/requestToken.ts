import { sendCommand } from './sendCommand';

export type RequestTokenResponseData = { token: string };

export const requestToken = () => {
  return sendCommand<undefined, RequestTokenResponseData>({ command: 'REQUEST_TOKEN' });
};
