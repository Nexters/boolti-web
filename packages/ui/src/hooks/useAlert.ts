import { useCallback, useContext } from 'react';

import alertContext, { AlertButtonText, AlertOptions } from '../contexts/alertContext';

const useAlert = () => {
  const context = useContext(alertContext);

  return useCallback(
    (message: React.ReactNode, buttonText?: AlertButtonText, options?: AlertOptions) => {
      return new Promise<boolean>((resolve) => {
        context?.setCurrentAlert({ message, buttonText, options, resolve });
      });
    },
    [context],
  );
};

export default useAlert;
