import {
  BooltiHttpError,
  BooltiHttpErrorParams,
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
      if (checkIsAuthError(error)) {
        if (checkIsWebView() && isWebViewBridgeAvailable()) {
          const token = (await requestToken()).data.token;
          localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, token);
          resetErrorBoundary();
        } else {
          navigate(PATH.LOGIN, { replace: true });
        }
      } else {
        if (checkIsHttpError(error)) {
          let customOptions: BooltiHttpErrorParams['customOptions'];
          try {
            const body = await error.response.json();
            customOptions = {
              errorTraceId: body.errorTraceId,
              type: body.type,
              detail: body.detail,
            };
          } catch {
            throw new BooltiHttpError({
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
