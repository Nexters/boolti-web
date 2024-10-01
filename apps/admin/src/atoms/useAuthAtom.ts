import Cookies from 'js-cookie';
import { LOCAL_STORAGE } from '@boolti/api';
import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

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

const accessTokenAtom = atom<string | null>(
  (() => {
    const accessTokenFromCookie = Cookies.get('x-access-token');
    const accessTokenFromStorage = storageMethod.getItem(LOCAL_STORAGE.ACCESS_TOKEN, null);

    if (accessTokenFromCookie) {
      localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, accessTokenFromCookie);
      return accessTokenFromCookie;
    }

    if (accessTokenFromStorage) {
      return accessTokenFromStorage;
    }

    return null;
  })(),
);

const refreshTokenAtom = atom<string | null>(
  (() => {
    const refreshTokenFromCookie = Cookies.get('x-access-token');
    const refreshTokenFromStorage = storageMethod.getItem(LOCAL_STORAGE.REFRESH_TOKEN, null);

    if (refreshTokenFromCookie) {
      localStorage.setItem(LOCAL_STORAGE.REFRESH_TOKEN, refreshTokenFromCookie);
      return refreshTokenFromCookie;
    }

    if (refreshTokenFromStorage) {
      return refreshTokenFromStorage;
    }

    return null;
  })(),
);

export const useAuthAtom = () => {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [refreshToken, setRefreshToken] = useAtom(refreshTokenAtom);

  const setToken = (accessToken: string, refreshToken: string) => {
    storageMethod.setItem(LOCAL_STORAGE.ACCESS_TOKEN, accessToken);
    storageMethod.setItem(LOCAL_STORAGE.REFRESH_TOKEN, refreshToken);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  };

  const removeToken = () => {
    storageMethod.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
    storageMethod.removeItem(LOCAL_STORAGE.REFRESH_TOKEN);
    setAccessToken(null);
    setRefreshToken(null);
  };

  const isLogin = () => !!accessToken && !!refreshToken;

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      switch (e.key) {
        case LOCAL_STORAGE.ACCESS_TOKEN: {
          setAccessToken(e.newValue);
          return;
        }
        case LOCAL_STORAGE.REFRESH_TOKEN: {
          setRefreshToken(e.newValue);
          return;
        }
      }
    };
    window.addEventListener('storage', handler);

    return () => {
      window.removeEventListener('storage', handler);
    };
  }, [setAccessToken, setRefreshToken]);

  return {
    setToken,
    removeToken,
    isLogin,
  };
};
