import { useCallback, useContext } from 'react';

import confirmContext, { ConfirmButtonText, ConfirmOptions } from '../contexts/confirmContext';

const useConfirm = () => {
  const context = useContext(confirmContext);

  return useCallback(
    (message: React.ReactNode, buttonText?: ConfirmButtonText, options?: ConfirmOptions) => {
      return new Promise<boolean>((resolve) => {
        context?.setCurrentConfirm({ message, buttonText, options, resolve });
      });
    },
    [context],
  );
};

export default useConfirm;
