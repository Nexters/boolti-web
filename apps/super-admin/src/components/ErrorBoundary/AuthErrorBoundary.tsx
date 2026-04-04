import { CustomHttpError, LOCAL_STORAGE, checkIsHttpError, checkIsAuthError } from '@boolti/api';
import React from 'react';
import { Navigate } from 'react-router-dom';

import { PATH } from '../../constants/routes';

interface AuthErrorBoundaryProps {
  children?: React.ReactNode;
}

interface AuthErrorBoundaryState {
  hasError: boolean;
  isAuthError: boolean;
}

const initialState: AuthErrorBoundaryState = {
  hasError: false,
  isAuthError: false,
};

class AuthErrorBoundary extends React.Component<AuthErrorBoundaryProps, AuthErrorBoundaryState> {
  public state: AuthErrorBoundaryState = initialState;

  public static getDerivedStateFromError(error: Error): AuthErrorBoundaryState {
    if (checkIsHttpError(error)) {
      const isRefreshFailure = error.response.url.includes('/login/refresh');
      return { hasError: true, isAuthError: checkIsAuthError(error) || isRefreshFailure };
    }

    if (error instanceof CustomHttpError) {
      const isAuth = error.status === 401 || error.status === 403;
      return { hasError: true, isAuthError: isAuth };
    }

    return { hasError: true, isAuthError: false };
  }

  public render() {
    if (this.state.hasError) {
      this.setState(initialState);

      if (this.state.isAuthError) {
        window.localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
        window.localStorage.removeItem(LOCAL_STORAGE.REFRESH_TOKEN);
        return <Navigate to={PATH.LOGIN} replace />;
      }

      return <Navigate to={PATH.INDEX} replace />;
    }

    return this.props.children;
  }
}

export default AuthErrorBoundary;
