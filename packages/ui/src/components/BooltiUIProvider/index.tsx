import ConfirmProvider from '../ConfirmProvider';
import DialogProvider from '../DialogProvider';
import ThemeProvider from '../ThemeProvider';

interface BooltiUIProviderProps {
  children: React.ReactNode;
}

const BooltiUIProvider = ({ children }: BooltiUIProviderProps) => {
  return (
    <ThemeProvider>
      <DialogProvider>
        <ConfirmProvider>{children}</ConfirmProvider>
      </DialogProvider>
    </ThemeProvider>
  );
};

export default BooltiUIProvider;
