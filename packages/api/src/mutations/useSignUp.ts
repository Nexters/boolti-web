import { useMutation } from '@tanstack/react-query';
import { fetcher } from '../fetcher';

interface PostSignUpRequest {
  nickname?: string;
  email?: string;
  phoneNumber?: string;
  oauthType: 'KAKAO' | 'APPLE';
  oauthIdentity: string;
  imgPath?: string;
}

interface PostSignUpResponse {
  accessToken: string;
  refreshToken: string;
}

const postSignUp = ({
  nickname,
  email,
  phoneNumber,
  oauthType,
  oauthIdentity,
  imgPath,
}: PostSignUpRequest) =>
  fetcher.post<PostSignUpResponse>('web/papi/v1/signup/sns', {
    json: { nickname, email, phoneNumber, oauthType, oauthIdentity, imgPath },
  });

const useSignUp = () =>
  useMutation(
    ({ nickname, email, phoneNumber, oauthType, oauthIdentity, imgPath }: PostSignUpRequest) =>
      postSignUp({ nickname, email, phoneNumber, oauthType, oauthIdentity, imgPath }),
  );

export default useSignUp;
