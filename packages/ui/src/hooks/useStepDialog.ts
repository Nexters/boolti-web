import { nanoid } from 'nanoid';
import { useCallback, useContext, useRef, useState } from 'react';
import dialogContext, { DialogListItem } from '../contexts/dialogContext';
import { DialogMobileType } from '../components/Dialog/types';

const useStepDialog = <T extends string>() => {
  const id = useRef<string>(nanoid(6));
  const [isOpen, setIsOpen] = useState(false);

  const context = useContext(dialogContext);

  const open = useCallback(
    ({
      initialHistory,
      content,
      isAuto,
      width,
      contentPadding,
      mobileType,
      onClose,
    }: {
      initialHistory: T[];
      content: Record<
        T,
        {
          children: (props: { push: (nextStep: T) => void; back: () => void }) => React.ReactNode;
          title?: string;
        }
      >;
      isAuto?: boolean;
      width?: string;
      contentPadding?: string;
      mobileType?: DialogMobileType;
      onClose?: () => void;
    }) => {
      const newDialog: DialogListItem = {
        type: 'funnel',
        initialHistory,
        id: id.current,
        content,
        isAuto,
        width,
        contentPadding,
        mobileType,
        onClose,
      };
      setIsOpen(true);
      context?.setDialogList((prev) => [...prev, newDialog]);
    },
    [context, id],
  );

  const close = useCallback(() => {
    setIsOpen(false);
    context?.setDialogList((prev) => prev.filter((dialog) => dialog.id !== id.current));
  }, [context, id]);

  return {
    id: id.current,
    isOpen,
    open,
    close,
  };
};

export default useStepDialog;
