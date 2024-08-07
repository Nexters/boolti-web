import { isBooltiHTTPError } from '@boolti/api/src/BooltiHTTPError';
import { useEffect } from 'react';
import { Navigate, useRouteError } from 'react-router-dom';
import { PATH } from '~/constants/routes';

const GlobalErrorBoundary = () => {
  const error = useRouteError();

  useEffect(() => {
    if (error instanceof Error && isBooltiHTTPError(error)) {
      const errorMessage = '[BooltiHTTPError] errorTraceId:' + error.errorTraceId + '\n';
      '[BooltiHTTPError] type' + error.type + '\n';
      '[BooltiHTTPError] detail' + error.detail;
      console.error(errorMessage);
      return;
    }
    console.error(error);
  });

  return <Navigate to={PATH.INDEX} replace />;
};

export default GlobalErrorBoundary;
