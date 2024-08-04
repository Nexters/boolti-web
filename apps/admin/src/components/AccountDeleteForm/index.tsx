import { Button } from '@boolti/ui';
import Styled from './AccountDeleteForm.styles';
import { useForm } from 'react-hook-form';
import { queryKeys, useDeleteMe, useLogout, useQueryClient } from '@boolti/api';
import { useAuthAtom } from '~/atoms/useAuthAtom';
import { useNavigate } from 'react-router-dom';
import { PATH } from '~/constants/routes';

export interface AccountDeleteFormInputs {
  reason: string;
}

interface AccountDeleteFormProps {
  oauthType?: 'KAKAO' | 'APPLE';
  onClose: () => void;
}

const AccountDeleteForm = ({ oauthType, onClose }: AccountDeleteFormProps) => {
  const navigate = useNavigate();

  const deleteMeMutation = useDeleteMe();
  const { removeToken } = useAuthAtom();
  const queryClient = useQueryClient();
  const logoutMutation = useLogout();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<AccountDeleteFormInputs>();

  const submitHandler = async (data: AccountDeleteFormInputs) => {
    let appleIdAuthorizationCode: string | undefined = undefined;

    if (oauthType === 'APPLE') {
      const appleAuthData = await window.AppleID?.auth.signIn();

      appleIdAuthorizationCode = appleAuthData?.authorization.code;
    }

    deleteMeMutation.mutate({
      reason: data.reason,
      appleIdAuthorizationCode,
    });

    await logoutMutation.mutateAsync();

    removeToken();
    queryClient.removeQueries({ ...queryKeys.user.summary });

    onClose();
    navigate(PATH.INDEX);
  };

  return (
    <Styled.AccountDeleteForm onSubmit={handleSubmit(submitHandler)}>
      <Styled.AccountDeleteFormDescription>
        삭제 이유를 알려 주세요. 주신 의견 참고하여 더 나은 서비스를 제공하는 불티가 되겠습니다.
      </Styled.AccountDeleteFormDescription>
      <Styled.AccountDeleteFormTextArea
        placeholder="예) 계정 삭제 후 재 가입할게요"
        rows={3}
        autoFocus
        {...register('reason', { required: true })}
      />
      <Styled.AccountDeleteFormButtonWrapper>
        <Button
          type="button"
          colorTheme="line"
          size="bold"
          onClick={() => {
            onClose();
            reset();
          }}
        >
          취소하기
        </Button>
        <Button type="submit" colorTheme="primary" size="bold" disabled={!isValid}>
          삭제하기
        </Button>
      </Styled.AccountDeleteFormButtonWrapper>
    </Styled.AccountDeleteForm>
  );
};

export default AccountDeleteForm;
