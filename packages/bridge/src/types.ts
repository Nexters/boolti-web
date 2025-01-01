export type WebviewCommand =
  | 'NAVIGATE_TO_SHOW_DETAIL'
  | 'NAVIGATE_BACK'
  | 'REQUEST_TOKEN'
  | 'SHOW_TOAST';

export type BaseCommand = {
  id: string;
  timestamp: string;
};

export type Command<Data = undefined> = Data extends undefined
  ? BaseCommand & { command: WebviewCommand }
  : BaseCommand & { command: WebviewCommand; data: Data };

export type ResponseListener<Data = undefined> = (message: Command<Data>) => void;

export type PostMessageFn = (message: string) => void;

declare global {
  interface Window {
    webkit?: {
      messageHandlers?: {
        boolti: {
          postMessage?: PostMessageFn;
        };
      };
    };

    boolti?: {
      postMessage?: PostMessageFn;
    };

    __boolti__webview__bridge__: {
      postMessage: PostMessageFn;
    };
  }
}
