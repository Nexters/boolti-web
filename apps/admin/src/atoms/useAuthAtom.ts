import { LOCAL_STORAGE } from '@boolti/api';
import { useAtom } from 'jotai';
import { atomWithStorage, RESET } from 'jotai/utils';
import { useMemo } from 'react';

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

  const login = (accessToken: string, refreshToken: string) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  };

  const logout = () => {
    setAccessToken(RESET);
    setRefreshToken(RESET);
  };

  const isLogin = useMemo(() => {
    console.log(accessToken, refreshToken);
    return !!accessToken && !!refreshToken;
  }, [accessToken, refreshToken]);

  return {
    login,
    logout,
    isLogin,
  };
};
