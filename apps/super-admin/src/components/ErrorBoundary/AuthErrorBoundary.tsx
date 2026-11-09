import { LOCAL_STORAGE, checkIsAuthError, checkIsHttpError } from '@boolti/api';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Button, Result, Space } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PATH } from '../../constants/routes';

interface AuthErrorBoundaryProps {
  children?: React.ReactNode;
  onReset: () => void;
}

interface AuthErrorBoundaryState {
  hasError: boolean;
  isAuthError: boolean;
}

const initialState: AuthErrorBoundaryState = {
  hasError: false,
  isAuthError: false,
};

const LoginRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
    window.localStorage.removeItem(LOCAL_STORAGE.REFRESH_TOKEN);
    navigate(PATH.LOGIN, { replace: true });
  }, [navigate]);

  return null;
};

class AuthErrorBoundaryContent extends React.Component<
  AuthErrorBoundaryProps,
  AuthErrorBoundaryState
> {
  public state: AuthErrorBoundaryState = initialState;

  public static getDerivedStateFromError(error: Error): AuthErrorBoundaryState {
    if (checkIsHttpError(error)) {
      const isRefreshFailure = error.response.url.includes('/login/refresh');
      return { hasError: true, isAuthError: checkIsAuthError(error) || isRefreshFailure };
    }

    return { hasError: true, isAuthError: false };
  }

  private retry = () => {
    this.props.onReset();
    this.setState(initialState);
  };

  public render() {
    if (this.state.isAuthError) {
      return <LoginRedirect />;
    }

    if (this.state.hasError) {
      return (
        <Result
          status="error"
          title="정보를 불러오지 못했어요"
          subTitle="잠시 후 다시 시도해 주세요. 문제가 계속되면 다시 로그인해 주세요."
          extra={
            <Space>
              <Button type="primary" onClick={this.retry}>
                다시 시도
              </Button>
              <Button onClick={() => this.setState({ isAuthError: true })}>다시 로그인</Button>
            </Space>
          }
        />
      );
    }

    return this.props.children;
  }
}

const AuthErrorBoundary = ({ children }: React.PropsWithChildren) => (
  <QueryErrorResetBoundary>
    {({ reset }) => <AuthErrorBoundaryContent onReset={reset}>{children}</AuthErrorBoundaryContent>}
  </QueryErrorResetBoundary>
);

export default AuthErrorBoundary;
