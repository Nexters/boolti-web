import { createContext } from 'react';

export interface AlertOptions {
  confirmButtonColorTheme?: 'primary' | 'neutral';
}

export interface AlertButtonText {
  confirm?: string;
}

export interface IAlert {
  message: React.ReactNode;
  buttonText?: AlertButtonText;
  options?: AlertOptions;
  resolve: (value: boolean | PromiseLike<boolean>) => void;
}

interface AlertContext {
  currentAlert: IAlert | null;
  setCurrentAlert: React.Dispatch<React.SetStateAction<IAlert | null>>;
}

const alertContext = createContext<AlertContext | null>(null);

export default alertContext;
