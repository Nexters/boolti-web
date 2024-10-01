import Cookies from 'js-cookie';
import { LOCAL_STORAGE, COOKIES } from '@boolti/api';
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
    const accessTokenFromCookie = Cookies.get(COOKIES.ACCESS_TOKEN);
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
    const refreshTokenFromCookie = Cookies.get(COOKIES.ACCESS_TOKEN);
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
    Cookies.remove(COOKIES.ACCESS_TOKEN);
    Cookies.remove(COOKIES.REFRESH_TOKEN);
    setAccessToken(null);
    setRefreshToken(null);
  };

  const isLogin = () => !!accessToken && !!refreshToken;

  useEffect(() => {
    const handler = ({ key, newValue }: StorageEvent) => {
      switch (key) {
        case LOCAL_STORAGE.ACCESS_TOKEN: {
          setAccessToken(newValue);
          newValue
            ? Cookies.set(COOKIES.ACCESS_TOKEN, newValue)
            : Cookies.remove(COOKIES.ACCESS_TOKEN);
          return;
        }
        case LOCAL_STORAGE.REFRESH_TOKEN: {
          setRefreshToken(newValue);
          newValue
            ? Cookies.set(COOKIES.REFRESH_TOKEN, newValue)
            : Cookies.remove(COOKIES.REFRESH_TOKEN);
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
