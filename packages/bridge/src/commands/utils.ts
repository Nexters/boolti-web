import { WebViewCommand } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getTimeStamp = () => new Date().valueOf().toString();

const getUuid = () => uuidv4();

export const getBaseCommand = (command: WebViewCommand) => ({
  timestamp: getTimeStamp(),
  id: getUuid(),
  command,
});
