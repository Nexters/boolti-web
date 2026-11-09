import { sendCommand } from './sendCommand';

export interface ClientInfo {
  platform: 'iOS' | 'Android';
  osVersion: string;
  appVersion: string;
  deviceModel: string;
  screenResolution: string;
  isLoggedIn: boolean;
  userId: string | null;
}

export const requestClientInfo = () =>
  sendCommand<undefined, ClientInfo>({ command: 'REQUEST_CLIENT_INFO' }, 5_000);
