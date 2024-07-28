import { createContext } from 'react';

export interface ConfirmOptions {
  confirmButtonColorTheme?: 'primary' | 'neutral';
  type?: 'alert' | 'confirm';
}

export interface ConfirmButtonText {
  cancel?: string;
  confirm?: string;
}

export interface IConfirm {
  message: React.ReactNode;
  buttonText?: ConfirmButtonText;
  options?: ConfirmOptions;
  resolve: (value: boolean | PromiseLike<boolean>) => void;
}

interface ConfirmContext {
  currentConfirm: IConfirm | null;
  setCurrentConfirm: React.Dispatch<React.SetStateAction<IConfirm | null>>;
}

const confirmContext = createContext<ConfirmContext | null>(null);

export default confirmContext;
