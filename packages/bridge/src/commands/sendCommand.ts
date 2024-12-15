import { BRIDGE } from '../constants';
import { Command, PostMessageFn, ResponseListener, WebviewCommand } from '../types';
import { messageListeners, subscribe, unsubscribe } from './messageListeners';
import {
  checkIsAndroid,
  getTimeStamp,
  getUuid,
  hasAndroidPostMessage,
  hasWebkitPostMessage,
} from '../utils';

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
  const command = { id, timestamp, ...request };
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

window[BRIDGE] = window[BRIDGE] || {
  postMessage: (command: Command) => {
    const message = JSON.stringify(command);

    console.log('[sendCommand.ts] RCVD:', message);

    try {
      const messageListener = messageListeners.get(command.id);

      if (messageListener) {
        messageListener(command);
      }
    } catch (error) {
      console.warn(`[sendCommand.ts] NOT RCVD: ${message}`);
      if (error instanceof Error) {
        console.warn(
          `[sendCommand.ts] NOT RCVD: ${JSON.stringify({ name: error.name, message: error.message })}`,
        );
      }
    }
  },
};
