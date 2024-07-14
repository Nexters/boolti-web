import { LOCAL_STORAGE } from '@boolti/api';
import { useAtom } from 'jotai';
import { atomWithStorage, RESET } from 'jotai/utils';

const storageMethod = {
  getItem: (key: string, initialValue: string | null) => {
    return window.localStorage.getItem(key) ?? initialValue;
  },
  setItem: (key: string, value: string | null) => {
    window.localStorage.setItem(key, value as string);
  },
  removeItem: (key: string) => {
    window.localStorage.removeItem(key);
  },
};
const accessTokenAtom = atomWithStorage<string | null>(
  LOCAL_STORAGE.ACCESS_TOKEN,
  window.localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN),
  storageMethod,
);
const refreshTokenAtom = atomWithStorage<string | null>(
  LOCAL_STORAGE.REFRESH_TOKEN,
  window.localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN),
  storageMethod,
);

export const useAuthAtom = () => {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [refreshToken, setRefreshToken] = useAtom(refreshTokenAtom);

  const setToken = (accessToken: string, refreshToken: string) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  };

  const removeToken = () => {
    setAccessToken(RESET);
    setRefreshToken(RESET);
  };

  const isLogin = () => !!accessToken && !!refreshToken;

  return {
    setToken,
    removeToken,
    isLogin,
  };
};
