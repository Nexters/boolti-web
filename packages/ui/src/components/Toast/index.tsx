import { ToastBar, Toaster } from 'react-hot-toast';

import Styled from './Toast.styles';

const Toast = () => {
  return (
    <Toaster
      containerStyle={{
        top: 100,
      }}
    >
      {(toast) => (
        <ToastBar toast={toast} style={{ padding: '0' }}>
          {({ icon, message }) => (
            <Styled.Toast>
              <Styled.Icon>{icon}</Styled.Icon>
              <Styled.Message>{message}</Styled.Message>
            </Styled.Toast>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};

export default Toast;
