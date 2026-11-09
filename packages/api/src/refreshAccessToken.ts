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
    // prefixUrl로 넘겨야 API_URL의 끝 슬래시 유무와 무관하게 경로가 정규화된다.
    // 직접 이어붙이면 API_URL이 '/'로 끝날 때 '//web/...'이 되어 서버가 라우팅하지 못한다.
    const response = await ky.post(
      `${IS_SUPER_ADMIN ? 'sa-api' : 'web'}/papi/v1/login/refresh`,
      {
        prefixUrl: API_URL,
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
