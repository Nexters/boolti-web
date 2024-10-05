export interface BankAccount {
  bankAccountId: number;
  bankName: string;
  /** 은행 코드 */
  bankCode: string;
  /** 계좌 번호 */
  bankAccountNumber: string;
  /** 예금주 */
  bankAccountHolder: string;
}

export interface UserProfileSummaryResponse {
  /** 사용자 pk */
  id: number;
  /** 사용자 닉네임 */
  nickname: string;
  /** 사용자 이메일 */
  email?: string;
  /** 사용자 식별 코드 */
  userCode: string;
  /** 사용자 프로필 이미지 경로 */
  imagePath?: string;
  /** 사용자 연결 서비스 */
  oauthType: 'KAKAO' | 'APPLE';
}

export interface UserProfileLink {
  title: string;
  link: string;
}

export interface UserProfileResponse {
  id: number;
  nickname: string;
  email: string;
  userCode: string;
  imgPath: string;
  introduction: string;
  link: UserProfileLink[];
  oauthType: 'KAKAO' | 'APPLE';
}

export type BankAccountListResponse = BankAccount[];
