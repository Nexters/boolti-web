import { useEffect } from 'react';
import { navigateToAppScheme } from '~/utils/app';
import { openStoreLink } from '~/utils/link';
import { SCHEMES } from '~/constants/schemes';

const isIOS = () => /iphone|ipad|ipod/i.test(window.navigator.userAgent);

const AppStoreBridge = () => {
  useEffect(() => {
    const handleRedirect = async () => {
      if (isIOS()) {
        openStoreLink();
        return;
      }

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
