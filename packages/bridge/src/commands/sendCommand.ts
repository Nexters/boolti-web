import { Command } from '../types';
import { checkIsAndroid, checkIsIOS, getUserAgent, getWebViewOS } from '../utils';

const execute = <T>(callback: () => T) => {
  return new Promise((resolve) => resolve(callback()));
};

export const sendCommand = async <RequestData = undefined, ResponseData = undefined>(
  command: Command<RequestData>,
) =>
  execute(async () => {
    const userAgent = getUserAgent();
    const os = getWebViewOS(userAgent);

    try {
      console.log(`[sendCommand.ts]: send to ${os}, ${JSON.stringify(command)}`);

      if (checkIsIOS(userAgent) && window.webkit?.messageHandlers?.boolti.postMessage) {
        const result = await window.webkit.messageHandlers.boolti.postMessage<
          RequestData,
          ResponseData
        >(command);

        console.log(`[sendCommand.ts]: recive from ios, ${JSON.stringify(result)}`);

        return result;
      } else if (checkIsAndroid(userAgent) && window.boolti?.postMessage) {
        const result = await window.boolti?.postMessage<ResponseData>(JSON.stringify(command));

        console.log(`[sendCommand.ts]: recive from aos, ${JSON.stringify(result)}`);

        return result;
      }
    } catch (error) {
      if (error instanceof Error) {
        const { name, message } = error;
        console.log(
          `[sendCommand.ts] catch error from ${os}, ${JSON.stringify({ name, message })}`,
        );
      } else {
        console.log(`[sendCommand.ts] catch error from ${os}, not error instance`);
      }

      return command;
    }
  });
