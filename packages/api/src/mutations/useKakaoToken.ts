import { useMutation } from '@tanstack/react-query';
import ky from 'ky';
import { KAKAO_REST_API_KEY } from '../secrets';

interface PostKakaoTokenRequest {
  code: string;
}

interface PostKakaoTokenResponse {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope: string;
  token_type: string;
}

const postKakaoToken = ({ code }: PostKakaoTokenRequest) => {
  const body = new URLSearchParams();

  body.set('grant_type', 'authorization_code');
  body.set('client_id', KAKAO_REST_API_KEY);
  body.set('redirect_uri', `${window.location.origin}/oauth/kakao`);
  body.set('code', code);

  return ky
    .post('https://kauth.kakao.com/oauth/token', {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body,
    })
    .json<PostKakaoTokenResponse>();
};

const useKakaoToken = () =>
  useMutation(({ code }: PostKakaoTokenRequest) => postKakaoToken({ code }));

export default useKakaoToken;
