import { useEffect } from 'react';
import { navigateToAppScheme } from '~/utils/app';
import { openStoreLink } from '~/utils/link';
import { SCHEMES } from '~/constants/schemes';

const AppStoreBridge = () => {
  useEffect(() => {
    const handleRedirect = async () => {
      const success = await navigateToAppScheme(SCHEMES.홈());

      if (!success) {
        openStoreLink();
      }
    };

    handleRedirect();
  }, []);

  return null;
};

export default AppStoreBridge;
