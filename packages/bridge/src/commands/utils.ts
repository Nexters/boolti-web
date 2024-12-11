import { v4 as uuidv4 } from 'uuid';

export const getTimeStamp = () => new Date().valueOf().toString();

export const getUuid = () => uuidv4();

export const hasAndroidPostMessage = () =>
  !!(typeof window !== 'undefined' && window.boolti && window.boolti.postMessage);

export const hasWebkitPostMessage = () =>
  !!(
    typeof window !== 'undefined' &&
    window.webkit &&
    window.webkit.messageHandlers &&
    window.webkit.messageHandlers.boolti &&
    window.webkit.messageHandlers.boolti.postMessage
  );

export const isWebViewBridgeAvailable = () => hasAndroidPostMessage() || hasWebkitPostMessage();
