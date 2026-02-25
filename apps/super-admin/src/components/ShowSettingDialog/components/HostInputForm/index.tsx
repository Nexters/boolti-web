import { useState } from 'react';
import { useToast } from '@boolti/ui';
import { useAddHost } from '@boolti/api';
import { HostType } from '@boolti/api/src/types/host';
import { CustomError } from '@boolti/api/src/types/error';
import Styled from './HostInputForm.styles';

interface HostInputFormProps {
  showId: number;
}

const HostInputForm = ({ showId }: HostInputFormProps) => {
  const [memberId, setMemberId] = useState<string>('');
  const toast = useToast();

  const { mutateAsync, isLoading } = useAddHost(showId);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await mutateAsync({
        body: {
          userCode: memberId,
          type: HostType.MANAGER,
        },
      });
      toast.success('초대를 완료했습니다.');
      setMemberId('');
    } catch (err: unknown) {
      const error = err as CustomError;
      if (error.type === 'USER_ALREADY_IN_SHOW_GROUP') {
        toast.error('이미 초대된 회원입니다.');
      } else {
        toast.error(
          '불티에 회원으로 등록된 ID로만 초대가 가능합니다.\nID를 확인 후 다시 시도해 주세요.',
        );
      }
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberId(e.target.value);
  };

  return (
    <Styled.Form onSubmit={onSubmit}>
      <Styled.InputWrapper text={memberId}>
        <Styled.Input
          placeholder="그룹원의 ID를 입력해 주세요"
          value={memberId}
          onChange={onChange}
        />
      </Styled.InputWrapper>
      <Styled.InviteButton disabled={!memberId || isLoading} size="bold" colorTheme="netural">
        초대하기
      </Styled.InviteButton>
    </Styled.Form>
  );
};

export default HostInputForm;
