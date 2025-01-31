import { ResponseListener } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const messageListeners: Map<string, ResponseListener<any>> = new Map();

export const subscribe = <Data = undefined>(id: string, listener: ResponseListener<Data>) => {
  messageListeners.set(id, listener);
};

export const unsubscribe = (id: string) => {
  messageListeners.delete(id);
};
