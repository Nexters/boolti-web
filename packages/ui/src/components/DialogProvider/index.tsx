import { useState } from 'react';

import dialogContext, { DialogListItem } from '../../contexts/dialogContext';
import Dialog from '../Dialog';
import StepDialog from '../Dialog/StepDialog';

interface DialogProviderProps {
  children: React.ReactNode;
}

const DialogProvider = ({ children }: DialogProviderProps) => {
  const [dialogList, setDialogList] = useState<DialogListItem[]>([]);

  return (
    <dialogContext.Provider value={{ dialogList, setDialogList }}>
      {children}
      {dialogList.map((dialog) => {
        switch (dialog.type) {
          case 'default': {
            return (
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
            )
          }
          case 'funnel': {
            return (
              <StepDialog
                key={dialog.id}
                initialHistory={dialog.initialHistory}
                content={dialog.content}
                open={!!dialogList.find(({ id }) => dialog.id === id)}
                isAuto={dialog.isAuto}
                width={dialog.width}
                contentPadding={dialog.contentPadding}
                mobileType={dialog.mobileType}
                onClose={() => {
                  dialog.onClose?.();
                  setDialogList((prev) => prev.filter(({ id }) => dialog.id !== id));
                }}
              />
            )
          }
        }
      }
      )}
    </dialogContext.Provider>
  );
};

export default DialogProvider;
