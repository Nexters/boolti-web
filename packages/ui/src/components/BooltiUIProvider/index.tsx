import '../../index.css';
import AlertProvider from '../AlertProvider';

import ConfirmProvider from '../ConfirmProvider';
import DialogProvider from '../DialogProvider';
import ThemeProvider from '../ThemeProvider';

interface BooltiUIProviderProps {
  children: React.ReactNode;
}

const BooltiUIProvider = ({ children }: BooltiUIProviderProps) => {
  return (
    <ThemeProvider>
      <AlertProvider>
        <ConfirmProvider>
          <DialogProvider>{children}</DialogProvider>
        </ConfirmProvider>
      </AlertProvider>
    </ThemeProvider>
  );
};

export default BooltiUIProvider;
