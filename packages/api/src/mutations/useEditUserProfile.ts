import { useMutation } from '@tanstack/react-query';
import { fetcher } from '../fetcher';
import { UserProfileLink } from '../types';

interface PutUserProfileRequestBody {
  nickname: string;
  profileImagePath?: string;
  introduction?: string;
  link?: UserProfileLink[];
}

const putUserProfile = (body: PutUserProfileRequestBody) =>
  fetcher.put('web/v1/users/me', {
    json: body,
  });

const useEditUserProfile = () =>
  useMutation((body: PutUserProfileRequestBody) => putUserProfile(body));

export default useEditUserProfile;
