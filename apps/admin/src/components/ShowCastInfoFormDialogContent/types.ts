import { ShowCastTeamCreateRequest, UserProfileResponse } from '@boolti/api';

export type ShowCastInfoFormInput = {
  name: ShowCastTeamCreateRequest['name'];
  members?: Array<
    Exclude<ShowCastTeamCreateRequest['members'], undefined>[number] &
      Pick<UserProfileResponse, 'nickname' | 'imgPath'>
  >;
};
