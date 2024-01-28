import { useCallback, useContext } from 'react';
import confirmContext, { ConfirmButtonText } from '../contexts/confirmContext';

const useConfirm = () => {
  const context = useContext(confirmContext);

  return useCallback(
    (message: React.ReactNode, buttonText?: ConfirmButtonText) => {
      return new Promise<boolean>((resolve) => {
        context?.setCurrentConfirm({ message, buttonText, resolve });
      });
    },
    [context],
  );
};

export default useConfirm;
