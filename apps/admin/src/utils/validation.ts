export const validateAccountNumber = (accountNumber: string) => {
  return accountNumber.length <= 14;
};

export const validateAccountHolder = (accountHolder: string) => {
  return /^[ㄱ-ㅎ가-힣]+$/.test(accountHolder);
};
