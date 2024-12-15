import { CustomHttpError, LOCAL_STORAGE } from '@boolti/api';
import React from 'react';
import { Navigate } from 'react-router-dom';

import { PATH } from '../../constants/routes';

interface AuthErrorBoundaryProps {
  children?: React.ReactNode;
}

interface AuthErrorBoundaryState {
  status: CustomHttpError['status'] | null;
}

const initialState: AuthErrorBoundaryState = {
  status: null,
};

class AuthErrorBoundary extends React.Component<AuthErrorBoundaryProps, AuthErrorBoundaryState> {
  public state: AuthErrorBoundaryState = initialState;

  public static getDerivedStateFromError(error: Error): AuthErrorBoundaryState {
    if (error instanceof CustomHttpError) {
      return {
        status: error.status,
      };
    }

    return {
      status: null,
    };
  }

  public render() {
    if (this.state.status !== null) {
      this.setState(initialState);

      window.localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
      window.localStorage.removeItem(LOCAL_STORAGE.REFRESH_TOKEN);

      return <Navigate to={PATH.LOGIN} replace />;
    }

    return this.props.children;
  }
}

export default AuthErrorBoundary;
