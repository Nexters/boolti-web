export const validateAccountNumber = (accountNumber: string) => {
  return 11 <= accountNumber.length && accountNumber.length <= 14;
};

export const validateAccountHolder = (accountHolder: string) => {
  return /^[ㄱ-ㅎ가-힣]+$/.test(accountHolder);
};
