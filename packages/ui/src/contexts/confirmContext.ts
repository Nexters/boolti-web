import { createContext } from 'react';

export interface ConfirmButtonText {
  cancel?: string;
  confirm?: string;
}

export interface IConfirm {
  message: React.ReactNode;
  buttonText?: ConfirmButtonText;
  resolve: (value: boolean | PromiseLike<boolean>) => void;
}

interface ConfirmContext {
  currentConfirm: IConfirm | null;
  setCurrentConfirm: React.Dispatch<React.SetStateAction<IConfirm | null>>;
}

const confirmContext = createContext<ConfirmContext | null>(null);

export default confirmContext;
