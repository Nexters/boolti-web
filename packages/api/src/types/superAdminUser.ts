export interface SuperAdminUserResponse {
  id: number;
  identity: string;
  active: boolean;
  createdAt: string;
  /** 비밀번호 초기화 뒤 아직 새 비밀번호로 바꾸지 않은 계정이면 true */
  passwordChangeRequired?: boolean;
}

/** 로그인한 슈퍼 어드민 본인 정보 */
export interface SuperAdminMeResponse {
  id: number;
  identity: string;
  /** 계정 관리 화이트리스트 포함 여부. 비밀번호 변경 필수 상태에서는 관리 작업이 막힌다. */
  canManageAccounts: boolean;
  /** true면 비밀번호를 바꾸기 전까지 일반 슈퍼 어드민 API를 쓸 수 없다. */
  passwordChangeRequired: boolean;
}

export interface SuperAdminPasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
}

/** 다른 계정을 관리할 때 요청자 본인을 다시 확인하는 정보 */
export interface SuperAdminOperatorRequest {
  requesterCurrentPassword: string;
}
