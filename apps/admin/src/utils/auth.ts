import { LOCAL_STORAGE } from '@boolti/api';

export const getIsLogin = () => {
  return (
    window.localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN) &&
    window.localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN)
  );
};
