import { useToast } from '@boolti/ui';
import { useCallback } from 'react';

const ERROR_MESSAGES = {
  create: '공연을 등록하지 못했어요. 잠시 후 다시 시도해 주세요.',
  edit: '공연을 수정하지 못했어요. 잠시 후 다시 시도해 주세요.',
} as const;

const useShowSubmissionErrorToast = (type: keyof typeof ERROR_MESSAGES) => {
  const toast = useToast();

  return useCallback(() => {
    toast.error(ERROR_MESSAGES[type]);
  }, [toast, type]);
};

export default useShowSubmissionErrorToast;
