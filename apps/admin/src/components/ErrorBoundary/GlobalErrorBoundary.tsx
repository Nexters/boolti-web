import { checkIsCustomHttpError } from '@boolti/api';
import { useEffect } from 'react';
import { Navigate, useRouteError } from 'react-router-dom';
import { PATH } from '~/constants/routes';

const GlobalErrorBoundary = () => {
  const error = useRouteError();

  useEffect(() => {
    if (error instanceof Error && checkIsCustomHttpError(error)) {
      const errorMessage = '[CustomHttpError] errorTraceId:' + error.errorTraceId + '\n';
      '[CustomHttpError] type' + error.type + '\n';
      '[CustomHttpError] detail' + error.detail;
      console.error(errorMessage);
      return;
    }
    console.error(error);
  });

  return <Navigate to={PATH.INDEX} replace />;
};

export default GlobalErrorBoundary;
