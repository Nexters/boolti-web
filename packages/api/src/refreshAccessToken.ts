import ky from 'ky';
import { API_URL, IS_SUPER_ADMIN, LOCAL_STORAGE } from './constants';
import { checkIsWebView, isWebViewBridgeAvailable, requestToken } from '@boolti/bridge';

interface PostRefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

const postRefreshToken = async () => {
  const refreshToken = window.localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN);

  if (refreshToken) {
    const response = await ky.post(
      `${API_URL}/${IS_SUPER_ADMIN ? 'sa-api' : 'web'}/papi/v1/login/refresh`,
      {
        json: {
          refreshToken,
        },
      },
    );
    return await response.json<PostRefreshTokenResponse>();
  }
};

export async function refreshAccessToken() {
  let newAccessToken: string | undefined = undefined,
    newRefreshToken: string | undefined = undefined;

  if (checkIsWebView() && isWebViewBridgeAvailable()) {
    newAccessToken = (await requestToken()).data.token;
  } else {
    const { accessToken, refreshToken } = (await postRefreshToken()) ?? {};
    newAccessToken = accessToken;
    newRefreshToken = refreshToken;
  }

  if (newAccessToken) {
    window.localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, newAccessToken);

    if (newRefreshToken) {
      window.localStorage.setItem(LOCAL_STORAGE.REFRESH_TOKEN, newRefreshToken);
    }
  }

  return newAccessToken;
}
