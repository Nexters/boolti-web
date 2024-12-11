export type WebViewCommand = 'NAVIGATE_TO_SHOW_DETAIL' | 'NAVIGATE_BACK' | 'REQUEST_TOKEN';

export type BaseCommand = {
  id: string;
  timestamp: string;
  command: WebViewCommand;
};

export type Command<Data = undefined> = Data extends undefined
  ? BaseCommand
  : BaseCommand & { data: Data };

declare global {
  interface Window {
    webkit?: {
      messageHandlers?: {
        boolti: {
          postMessage?: <RequestData = undefined, ResponseData = undefined>(
            command: Command<RequestData> | string,
          ) => Promise<Command<ResponseData>>;
        };
      };
    };

    boolti?: {
      postMessage?: <ResponseData = undefined>(command: string) => Promise<Command<ResponseData>>;
    };
  }
}
