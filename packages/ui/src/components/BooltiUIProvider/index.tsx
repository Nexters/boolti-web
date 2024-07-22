import '../../index.css';

import ConfirmProvider from '../ConfirmProvider';
import DialogProvider from '../DialogProvider';
import ThemeProvider from '../ThemeProvider';

interface BooltiUIProviderProps {
  children: React.ReactNode;
}

const BooltiUIProvider = ({ children }: BooltiUIProviderProps) => {
  return (
    <ThemeProvider>
      <ConfirmProvider>
        <DialogProvider>{children}</DialogProvider>
      </ConfirmProvider>
    </ThemeProvider>
  );
};

export default BooltiUIProvider;
