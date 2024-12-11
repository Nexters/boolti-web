import { BRIDGE } from '../constants';
import { Command, PostMessageFn, ResponseListener, WebviewCommand } from '../types';
import { messageListeners, subscribe, unsubscribe } from './messageListeners';
import { getTimeStamp, getUuid, hasAndroidPostMessage, hasWebkitPostMessage } from './utils';

const getPostMessageFn = (): PostMessageFn | null => {
  if (hasAndroidPostMessage()) {
    return (jsonMessage) => {
      window.boolti?.postMessage?.(jsonMessage);
    };
  }

  if (hasWebkitPostMessage()) {
    return (jsonMessage) => {
      window.webkit?.messageHandlers?.boolti?.postMessage?.(jsonMessage);
    };
  }

  return null;
};

export const sendCommand = <RequestData = undefined, ResponseData = undefined>(
  request: {
    command: WebviewCommand;
    data?: RequestData;
  },
  timeout: number = 1_000,
): Promise<Command<ResponseData>> => {
  const postMessage = getPostMessageFn();
  const id = getUuid();
  const timestamp = getTimeStamp();
  const command = {
    id,
    timestamp,
    ...request,
  };
  const message = JSON.stringify(command, undefined, 2);

  console.log('[sendCommand.ts] SEND:', message);

  if (!postMessage) {
    console.warn('[sendCommand.ts] NOT WEBVIEW:', command);
    return Promise.reject(command);
  }

  setTimeout(() => {
    postMessage(message);
  }, 0);

  return new Promise((resolve, reject) => {
    const listener: ResponseListener<ResponseData> = (response) => {
      if (response.id === command.id) {
        resolve(response);
        unsubscribe(id);
      }
    };

    subscribe(id, listener);

    if (timeout) {
      setTimeout(() => {
        console.warn('[sendCommand.ts] TIMEOUT:', command);
        unsubscribe(id);
        reject(command);
      }, timeout);
    }
  });
};

window[BRIDGE].postMessage = (command: string) => {
  console.log('[sendCommand.ts] RCVD:', command);

  try {
    const message: Command = JSON.parse(command);
    const messageListener = messageListeners.get(message.id);

    if (messageListener) {
      messageListener(message);
    }
  } catch (error) {
    console.warn(`[sendCommand.ts] NOT RCVD: ${command}`);
    if (error instanceof Error) {
      console.warn(
        `[sendCommand.ts] NOT RCVD: ${JSON.stringify({ name: error.name, message: error.message })}`,
      );
    }
  }
};
