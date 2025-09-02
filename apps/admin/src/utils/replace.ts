// 20자 이내의 ID 생성 가능 (영어 소문자, 숫자, _ 사용 가능)
export const replaceUserCode = (text: string) => {
  return text.replace(/[^a-z0-9_]/g, '').slice(0, 20);
};
