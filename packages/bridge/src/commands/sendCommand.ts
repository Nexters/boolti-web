import { Command } from '../types';
import { checkIsAndroid, checkIsIOS, getUserAgent } from '../utils';

export const sendCommand = async <RequestData = undefined, ResponseData = undefined>(
  command: Command<RequestData>,
): Promise<Command<ResponseData>> => {
  const userAgent = getUserAgent();

  try {
    if (checkIsIOS(userAgent) && window.webkit?.messageHandlers?.boolti.postMessage) {
      const result = await window.webkit.messageHandlers.boolti.postMessage<
        RequestData,
        ResponseData
      >(command);
      return new Promise((resolve) => resolve(result));
    } else if (checkIsAndroid(userAgent) && window.boolti?.postMessage) {
      const result = await window.boolti?.postMessage<ResponseData>(JSON.stringify(command));
      return new Promise((resolve) => resolve(result));
    }
    return new Promise((_, reject) => reject(command));
  } catch (e) {
    return new Promise((_, reject) => reject(command));
  }
};
