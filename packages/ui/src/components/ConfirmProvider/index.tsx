import { useState } from 'react';
import confirmContext, { IConfirm } from '../../contexts/confirmContext';
import Confirm from '../Confirm';

interface ConfirmProviderProps {
  children: React.ReactNode;
}

const ConfirmProvider = ({ children }: ConfirmProviderProps) => {
  const [currentConfirm, setCurrentConfirm] = useState<IConfirm | null>(null);

  return (
    <confirmContext.Provider value={{ currentConfirm, setCurrentConfirm }}>
      {children}
      {currentConfirm && (
        <Confirm
          cancelText={currentConfirm.buttonText?.cancel}
          confirmText={currentConfirm.buttonText?.confirm}
          onCancel={() => {
            currentConfirm.resolve(false);
            setCurrentConfirm(null);
          }}
          onConfirm={() => {
            currentConfirm.resolve(true);
            setCurrentConfirm(null);
          }}
        >
          {currentConfirm.message}
        </Confirm>
      )}
    </confirmContext.Provider>
  );
};

export default ConfirmProvider;
