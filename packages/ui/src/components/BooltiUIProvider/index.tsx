import { DndProvider } from 'react-dnd';
import '../../index.css';
import AlertProvider from '../AlertProvider';

import ConfirmProvider from '../ConfirmProvider';
import DialogProvider from '../DialogProvider';
import ThemeProvider from '../ThemeProvider';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface BooltiUIProviderProps {
  children: React.ReactNode;
}

const BooltiUIProvider = ({ children }: BooltiUIProviderProps) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider>
        <AlertProvider>
          <ConfirmProvider>
            <DialogProvider>
              {children}
            </DialogProvider>
          </ConfirmProvider>
        </AlertProvider>
      </ThemeProvider>
    </DndProvider>
  );
};

export default BooltiUIProvider;
