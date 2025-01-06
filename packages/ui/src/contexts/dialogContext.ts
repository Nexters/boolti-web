import { createContext } from 'react';

interface DialogListItemBase {
  id: string;
  isAuto?: boolean;
  width?: string;
  contentPadding?: string;
  mobileType?: 'bottomSheet' | 'fullPage' | 'centerPopup';
  onClose?: () => void;
}

interface DefaultDialogListItem extends DialogListItemBase {
  type: 'default'
  content: React.ReactNode;
  title?: string
}

interface StepDialogListItem extends DialogListItemBase {
  type: 'funnel'
  content: Record<string, {
    children: (props: {
      push: (nextStep: string) => void;
      back: () => void;
    }) => React.ReactNode
    title?: string
  }>
  initialHistory: string[]
}

export type DialogListItem = DefaultDialogListItem | StepDialogListItem

interface DialogContext {
  dialogList: DialogListItem[];
  setDialogList: React.Dispatch<React.SetStateAction<DialogListItem[]>>;
}

const dialogContext = createContext<DialogContext | null>(null);

export default dialogContext;
