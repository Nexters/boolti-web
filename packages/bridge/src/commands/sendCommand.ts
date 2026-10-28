import { BRIDGE } from '../constants';
import { Command, PostMessageFn, ResponseListener, WebviewCommand } from '../types';
import { messageListeners, subscribe, unsubscribe } from './messageListeners';
import { getTimeStamp, getUuid, hasAndroidPostMessage, hasWebkitPostMessage } from '../utils';

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

  return new Promise((resolve, reject) => {
    let responseTimer: ReturnType<typeof setTimeout> | undefined;
    const cleanup = () => {
      clearTimeout(responseTimer);
      unsubscribe(id);
    };
    const listener: ResponseListener<ResponseData> = (response) => {
      if (response.id === command.id && response.command === command.command) {
        cleanup();
        resolve(response);
      }
    };

    subscribe(id, listener);

    if (timeout) {
      responseTimer = setTimeout(() => {
        console.warn('[sendCommand.ts] TIMEOUT:', command);
        cleanup();
        reject(command);
      }, timeout);
    }

    setTimeout(() => {
      try {
        postMessage(message);
      } catch (error) {
        cleanup();
        reject(error);
      }
    }, 0);
  });
};

window[BRIDGE] = window[BRIDGE] || {
  postMessage: (input: Command | Command<unknown> | string) => {
    try {
      const command: Command = typeof input === 'string' ? JSON.parse(input) : input;
      if (!command || typeof command.id !== 'string') return;
      // Do not print native auth tokens or client identifiers in browser logs.
      const messageListener = messageListeners.get(command.id);

      if (messageListener) {
        messageListener(command);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.warn(
          `[sendCommand.ts] NOT RCVD: ${JSON.stringify({ name: error.name, message: error.message })}`,
        );
      }
    }
  },
};
