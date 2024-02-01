import { useMutation } from '@tanstack/react-query';
import ky from 'ky';

type PropertyKeys =
  | 'kakao_account.profile'
  | 'kakao_account.name'
  | 'kakao_account.email'
  | 'kakao_account.age_range'
  | 'kakao_account.birthday'
  | 'kakao_account.gender';

interface PostKakaoUserInfoRequest {
  accessToken: string;
  secureResource?: boolean;
  propertyKeys?: PropertyKeys[];
}

interface PostKakaoUserInfoResponse {
  id: number;
  connected_at?: string;
  kakao_account?: {
    profile?: {
      is_default_image?: boolean;
      nickname?: string;
      profile_image_url?: string;
      thumbnail_image_url?: string;
    };
    profile_image_needs_agreement?: boolean;
    profile_nickname_needs_agreement?: boolean;
    phone_number?: string;
    phone_number_needs_agreement?: boolean;
    email?: string;
    email_needs_agreement?: boolean;
  };
}

const postKakaoUserInfo = async ({
  accessToken,
  secureResource,
  propertyKeys,
}: PostKakaoUserInfoRequest) => {
  const query: Record<string, string> = {};

  if (secureResource !== undefined) {
    query.secure_resource = `${secureResource}`;
  }

  if (propertyKeys !== undefined && propertyKeys.length > 0) {
    query.property_keys = `[${propertyKeys.map((key) => `"${key}"`).join(',')}]`;
  }

  const queryString = new URLSearchParams(query).toString();

  return ky
    .post(`https://kapi.kakao.com/v2/user/me?${queryString}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    })
    .json<PostKakaoUserInfoResponse>();
};

const useKakaoUserInfo = () =>
  useMutation(({ accessToken, secureResource, propertyKeys }: PostKakaoUserInfoRequest) =>
    postKakaoUserInfo({ accessToken, secureResource, propertyKeys }),
  );

export default useKakaoUserInfo;
