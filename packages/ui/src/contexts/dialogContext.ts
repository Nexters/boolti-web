import { createContext } from 'react';

export interface IDialog {
  id: string;
  content: React.ReactNode;
  isAuto?: boolean;
  title?: string;
  width?: string;
  contentPadding?: string;
  mobileType?: 'bottomSheet' | 'fullPage' | 'centerPopup';
  onClose?: () => void;
}

interface DialogContext {
  dialogList: IDialog[];
  setDialogList: React.Dispatch<React.SetStateAction<IDialog[]>>;
}

const dialogContext = createContext<DialogContext | null>(null);

export default dialogContext;
