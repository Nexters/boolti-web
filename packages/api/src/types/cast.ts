export interface ShowCastTeamReadResponse {
  /** 출연진 팀 식별자 */
  id: number;
  /** 출연진 팀 이름 */
  name: string;
  /** 출연진 팀 멤버 목록 */
  members?: Array<{
    /** 공연 출연진 팀원 ID */
    id?: number;
    /** 유저 식별 코드 */
    userCode: string;
    /** 역할 이름 (1~100자. 빈 문자열 불가) */
    roleName: string;
    /** 유저 닉네임 */
    userNickname: string;
    /** 유저 프로필 이미지 경로 */
    userImgPath: string;
    /** 유저 생성 일시 */
    createdAt: string;
    /** 유저 수정 일시 */
    modifedAt: string;
  }>;
  /** 팀 생성 일시 */
  createdAt: string;
  /** 팀 수정 일시 */
  modifiedAt: string;
}

export interface ShowCastTeamCreateOrUpdateRequest {
  /** 팀 이름 */
  name: ShowCastTeamReadResponse['name'];
  /** 팀원 목록 */
  members?: ShowCastTeamReadResponse['members'];
}
