import { createContext } from 'react';

export interface IDialog {
  id: string;
  content: React.ReactNode;
  title?: string;
  onClose?: () => void;
}

interface DialogContext {
  dialogList: IDialog[];
  setDialogList: React.Dispatch<React.SetStateAction<IDialog[]>>;
}

const dialogContext = createContext<DialogContext | null>(null);

export default dialogContext;
