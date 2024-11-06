type CloseWebview = { command: 'CLOSE_WEBVIEW'; data: string };

export type WebViewCommand = CloseWebview;

declare global {
  interface Window {
    webkit?: {
      messageHandlers?: {
        boolti: {
          postMessage?: (command: WebViewCommand) => void;
        };
      };
    };
  }
}
