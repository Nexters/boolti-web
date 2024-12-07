export type WebViewCommand = 'NAVIGATE_TO_SHOW_DETAIL' | 'NAVIGATE_BACK' | 'REQUEST_TOKEN';

export type BaseCommand = {
  id: string;
  timestamp: string;
  command: WebViewCommand;
};

export type Command<Data = undefined> = Data extends undefined
  ? BaseCommand
  : BaseCommand & { data: Data };

type CommandFn = <RequestData = undefined, ResponseData = undefined>(
  command: Command<RequestData>,
) => Promise<Command<ResponseData>>;

export type NavigateToShowDetailRequestData = { showId: number };

export type RequestTokenResponseData = { token: string };

declare global {
  interface Window {
    webkit?: {
      messageHandlers?: {
        boolti: {
          postMessage?: CommandFn;
        };
      };
    };

    boolti?: {
      sendCommand?: CommandFn;
    };
  }
}
