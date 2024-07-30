import { nanoid } from 'nanoid';
import { useCallback, useContext, useRef } from 'react';

import dialogContext, { IDialog } from '../contexts/dialogContext';

const useDialog = () => {
  const id = useRef<string>(nanoid(6));

  const context = useContext(dialogContext);

  const open = useCallback(
    ({
      content,
      title,
      isAuto,
      width,
      contentPadding,
      mobileType,
      onClose,
    }: {
      content: React.ReactNode;
      title?: string;
      isAuto?: boolean;
      width?: string;
      contentPadding?: string;
      mobileType?: 'bottomSheet' | 'fullPage' | 'centerPopup';
      onClose?: () => void;
    }) => {
      const newDialog: IDialog = {
        id: id.current,
        content,
        title,
        isAuto,
        width,
        contentPadding,
        mobileType,
        onClose,
      };

      context?.setDialogList((prev) => [...prev, newDialog]);
    },
    [context, id],
  );

  const close = useCallback(() => {
    context?.setDialogList((prev) => prev.filter((dialog) => dialog.id !== id.current));
  }, [context, id]);

  return {
    id: id.current,
    open,
    close,
  };
};

export default useDialog;
