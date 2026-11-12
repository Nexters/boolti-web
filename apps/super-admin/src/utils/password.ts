import { checkIsHttpError } from '@boolti/api';

// 서버 BCrypt 제한과 같은 기준(UTF-8 72바이트). 한글은 한 글자가 3바이트라 글자 수로 세면 안 된다.
export const PASSWORD_MAX_BYTES = 72;

export const getUtf8ByteLength = (value: string) => new TextEncoder().encode(value).length;

/** 새 비밀번호 규칙 위반 메시지. 문제가 없으면 null. */
export const getNewPasswordError = (value: string): string | null => {
  if (!value) return '새 비밀번호를 입력해 주세요.';
  if (/\s/.test(value)) return '비밀번호에는 공백을 넣을 수 없어요.';
  if (getUtf8ByteLength(value) > PASSWORD_MAX_BYTES) {
    return `비밀번호가 너무 길어요. 영문 기준 ${PASSWORD_MAX_BYTES}자, 한글 기준 24자까지 쓸 수 있어요.`;
  }
  return null;
};

/** 서버 오류 응답 본문의 detail. 읽을 수 없으면 undefined. */
export const getServerErrorDetail = async (error: unknown): Promise<string | undefined> => {
  if (!(error instanceof Error) || !checkIsHttpError(error)) return undefined;
  try {
    const body = (await error.response.clone().json()) as { detail?: unknown };
    return typeof body.detail === 'string' && body.detail ? body.detail : undefined;
  } catch {
    return undefined;
  }
};
