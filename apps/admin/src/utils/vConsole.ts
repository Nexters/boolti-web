import { checkIsWebView } from '@boolti/bridge';
import type vConsole from 'vconsole';

let vConsoleObject: vConsole | undefined;

export const initVConsole = async () => {
  if (checkIsWebView()) {
    const { default: vConsole } = await import('vconsole');
    vConsoleObject = new vConsole({});
  }
};

export const destroyVConsole = () => {
  if (vConsoleObject) {
    vConsoleObject.destroy();
  }
};
