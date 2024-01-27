import { useCallback, useState } from 'react';

interface UseDialogParams {
  defaultOpen?: boolean;
}

const useDialogState = (params?: UseDialogParams) => {
  const [open, setOpen] = useState<boolean>(params?.defaultOpen ?? false);

  const openDialog = useCallback(() => {
    setOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setOpen(false);
  }, []);

  return {
    open,
    openDialog,
    closeDialog,
  };
};

export default useDialogState;
