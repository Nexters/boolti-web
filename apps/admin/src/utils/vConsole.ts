import { checkIsWebView } from '@boolti/bridge';
import type vConsole from 'vconsole';
import { IS_PRODUCTION_PHASE } from '~/constants/phase';

let vConsoleObject: vConsole | undefined;

export const initVConsole = async () => {
  if (checkIsWebView() && !IS_PRODUCTION_PHASE) {
    const { default: vConsole } = await import('vconsole');
    vConsoleObject = new vConsole({});
  }
};

export const destroyVConsole = () => {
  if (vConsoleObject) {
    vConsoleObject.destroy();
  }
};
