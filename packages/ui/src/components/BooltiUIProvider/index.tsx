import { DndProvider } from 'react-dnd-multi-backend'
import { HTML5toTouch } from 'rdndmb-html5-to-touch'

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
    <DndProvider options={HTML5toTouch}>
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
