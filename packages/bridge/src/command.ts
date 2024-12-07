import {
  Command,
  NavigateToShowDetailRequestData,
  RequestTokenResponseData,
  WebViewCommand,
} from './types';
import { checkIsAndroid, checkIsIOS, getUserAgent } from './utils';
import { v4 as uuidv4 } from 'uuid';

const getTimeStamp = () => new Date().valueOf().toString();

const getUuid = () => uuidv4();

const getBaseCommand = (command: WebViewCommand) => ({
  timestamp: getTimeStamp(),
  id: getUuid(),
  command,
});

const navigateToShowDetail = async ({
  showId,
}: NavigateToShowDetailRequestData): Promise<Command> => {
  const userAgent = getUserAgent();
  const baseCommand: Command = getBaseCommand('NAVIGATE_TO_SHOW_DETAIL');

  try {
    if (checkIsIOS(userAgent) && window.webkit?.messageHandlers?.boolti.postMessage) {
      const result =
        await window.webkit.messageHandlers.boolti.postMessage<NavigateToShowDetailRequestData>({
          ...baseCommand,
          data: {
            showId,
          },
        });
      return new Promise((resolve) => resolve(result));
    } else if (checkIsAndroid(userAgent) && window.boolti?.navigateToShowDeatil) {
      const result = await window.boolti?.navigateToShowDeatil(
        JSON.stringify({
          ...baseCommand,
          data: {
            showId,
          },
        }),
      );
      return new Promise((resolve) => resolve(result));
    }
    return new Promise((_, reject) => reject(baseCommand));
  } catch (e) {
    return new Promise((_, reject) => reject(baseCommand));
  }
};

const navigateBack = async (): Promise<Command> => {
  const userAgent = getUserAgent();
  const baseCommand: Command = getBaseCommand('NAVIGATE_BACK');

  try {
    if (checkIsIOS(userAgent) && window.webkit?.messageHandlers?.boolti.postMessage) {
      const result = await window.webkit.messageHandlers.boolti.postMessage(baseCommand);
      return new Promise((resolve) => resolve(result));
    } else if (checkIsAndroid(userAgent) && window.boolti?.naviagteBack) {
      const result = await window.boolti?.naviagteBack(JSON.stringify(baseCommand));
      return new Promise((resolve) => resolve(result));
    }
    return new Promise((_, reject) => reject(baseCommand));
  } catch (e) {
    return new Promise((_, reject) => reject(baseCommand));
  }
};

const requestToken = async (): Promise<Command<RequestTokenResponseData>> => {
  const userAgent = getUserAgent();
  const baseCommand: Command = getBaseCommand('REQUEST_TOKEN');

  try {
    if (checkIsIOS(userAgent) && window.webkit?.messageHandlers?.boolti.postMessage) {
      const result = await window.webkit.messageHandlers.boolti.postMessage<
        undefined,
        RequestTokenResponseData
      >(baseCommand);
      return new Promise((resolve) => resolve(result));
    } else if (checkIsAndroid(userAgent) && window.boolti?.requestToken) {
      const result = await window.boolti?.requestToken(JSON.stringify(baseCommand));
      return new Promise((resolve) => resolve(result));
    }
    return new Promise((_, reject) => reject(baseCommand));
  } catch (e) {
    return new Promise((_, reject) => reject(baseCommand));
  }
};

export const Bridge = {
  navigateToShowDetail,
  navigateBack,
  requestToken,
};
