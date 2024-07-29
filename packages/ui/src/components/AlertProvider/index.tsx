import { useState } from 'react';

import alertContext, { IAlert } from '../../contexts/alertContext';
import Alert from '../Alert';

interface AlertProviderProps {
  children: React.ReactNode;
}

const AlertProvider = ({ children }: AlertProviderProps) => {
  const [currentAlert, setCurrentAlert] = useState<IAlert | null>(null);

  return (
    <alertContext.Provider value={{ currentAlert, setCurrentAlert }}>
      {children}
      {currentAlert && (
        <Alert
          confirmText={currentAlert.buttonText?.confirm}
          confirmButtonColorTheme={currentAlert.options?.confirmButtonColorTheme}
          onConfirm={() => {
            currentAlert.resolve(true);
            setCurrentAlert(null);
          }}
        >
          {currentAlert.message}
        </Alert>
      )}
    </alertContext.Provider>
  );
};

export default AlertProvider;
