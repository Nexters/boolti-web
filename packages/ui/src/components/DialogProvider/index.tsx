import { useState } from 'react';

import dialogContext, { IDialog } from '../../contexts/dialogContext';
import Dialog from '../Dialog';

interface DialogProviderProps {
  children: React.ReactNode;
}

const DialogProvider = ({ children }: DialogProviderProps) => {
  const [dialogList, setDialogList] = useState<IDialog[]>([]);

  return (
    <dialogContext.Provider value={{ dialogList, setDialogList }}>
      {children}
      {dialogList.map((dialog) => (
        <Dialog
          key={dialog.id}
          open={!!dialogList.find(({ id }) => dialog.id === id)}
          title={dialog.title}
          isAuto={dialog.isAuto}
          width={dialog.width}
          contentPadding={dialog.contentPadding}
          mobileType={dialog.mobileType}
          onClose={() => {
            dialog.onClose?.();
            setDialogList((prev) => prev.filter(({ id }) => dialog.id !== id));
          }}
        >
          {dialog.content}
        </Dialog>
      ))}
    </dialogContext.Provider>
  );
};

export default DialogProvider;
