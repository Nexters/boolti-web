import {
  CustomHttpError,
  CustomHttpErrorParams,
  LOCAL_STORAGE,
  checkIsAuthError,
  checkIsHttpError,
} from '@boolti/api';
import { useNavigate } from 'react-router-dom';

import { PATH } from '../../constants/routes';

import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { checkIsWebView, isWebViewBridgeAvailable, requestToken } from '@boolti/bridge';
import { useEffect } from 'react';

const AuthErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const reset = async () => {
      // 리프레시 실패는 401이 아니라 400 TOKEN_REFRESH_FAILED로 오므로 URL로 함께 판별한다.
      // (super-admin의 AuthErrorBoundary와 같은 기준)
      const isAuthError =
        checkIsHttpError(error) &&
        (checkIsAuthError(error) || error.response.url.includes('/login/refresh'));

      if (isAuthError) {
        if (checkIsWebView() && isWebViewBridgeAvailable()) {
          const token = (await requestToken()).data.token;
          localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, token);
          resetErrorBoundary();
        } else {
          navigate(PATH.LOGIN, { replace: true });
        }
      } else {
        if (checkIsHttpError(error)) {
          let customOptions: CustomHttpErrorParams['customOptions'];
          try {
            const body = await error.response.json();
            customOptions = {
              errorTraceId: body.errorTraceId,
              type: body.type,
              detail: body.detail,
            };
          } catch {
            throw new CustomHttpError({
              request: error.request,
              response: error.response,
              options: error.options,
              customOptions,
            });
          }
        }
        navigate(PATH.HOME, { replace: true });
      }
    };

    reset();
  }, []);

  return null;
};

const AuthErrorBoundary = ({ children }: React.PropsWithChildren) => {
  return <ErrorBoundary FallbackComponent={AuthErrorFallback}>{children}</ErrorBoundary>;
};

export default AuthErrorBoundary;
