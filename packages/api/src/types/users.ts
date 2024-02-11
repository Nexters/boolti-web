export interface BankAccount {
  bankName: string;
  /** 은행 코드 */
  bankCode: string;
  /** 계좌 번호 */
  bankAccountNumber: string;
  /** 예금주 */
  bankAccountHolder: string;
}

export interface SettlementAccountInfoResponse {
  /** 은행 계좌 정보가 등록되어 있는지 여부 */
  hasSettlementAccount: boolean;
  bankAccount?: BankAccount;
}

export interface UserProfileSummaryResponse {
  /** 사용자 pk */
  id: number;
  /** 사용자 닉네임 */
  nickname: string;
  /** 사용자 이메일 */
  email?: string;
  /** 사용자 프로필 이미지 경로 */
  imagePath?: string;
}
