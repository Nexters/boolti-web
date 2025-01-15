interface CookieOptions {
  path?: string;
  'max-age'?: number;
  domain?: string;
  secure?: boolean;
  [key: string]: unknown;
}

const uscCookie = () => {
  const setCookie = (name: string, value: string, options: CookieOptions = {}) => {
    options.path = options.path || '/';

    let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    for (const [key, optionValue] of Object.entries(options)) {
      updatedCookie += `; ${key}`;
      if (optionValue !== true) {
        updatedCookie += `=${optionValue}`;
      }
    }

    console.log(`updatedCookie: ${updatedCookie}`);

    document.cookie = updatedCookie;
  };

  const getCookie = (name: string) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');

    for (const cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (decodeURIComponent(key) === name) {
        return decodeURIComponent(value);
      }
    }

    return null;
  };

  const deleteCookie = (name: string) => {
    setCookie(name, '', {
      'max-age': -1,
    });
  };

  return {
    setCookie,
    getCookie,
    deleteCookie,
  };
};

export default uscCookie;
