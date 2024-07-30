import { Button } from '@boolti/ui';
import Styled from './AccountDeleteForm.styles'
import { useForm } from 'react-hook-form';

export interface AccountDeleteFormInputs {
  reason: string;
}

interface AccountDeleteFormProps {
  onSubmit: (data: AccountDeleteFormInputs) => void;
  onClose: () => void;
}

const AccountDeleteForm = ({ onSubmit, onClose }: AccountDeleteFormProps) => {
  const { register, handleSubmit, reset, formState: {
    isValid
  } } = useForm<AccountDeleteFormInputs>();

  const submitHandler = (data: AccountDeleteFormInputs) => {
    onSubmit(data);
    reset();
  }

  return (
    <Styled.AccountDeleteForm onSubmit={handleSubmit(submitHandler)}>
      <Styled.AccountDeleteFormDescription>삭제 이유를 알려 주세요. 주신 의견 참고하여 더 나은 서비스를 제공하는 불티가 되겠습니다.</Styled.AccountDeleteFormDescription>
      <Styled.AccountDeleteFormTextArea placeholder="예) 계정 삭제 후 재 가입할게요" rows={3} autoFocus {...register('reason', { required: true })} />
      <Styled.AccountDeleteFormButtonWrapper>
        <Button type="button" colorTheme="line" size="medium" onClick={() => {
          onClose();
          reset();
        }}>취소하기</Button>
        <Button type="submit" colorTheme="primary" size="medium" disabled={!isValid}>삭제하기</Button>
      </Styled.AccountDeleteFormButtonWrapper>
    </Styled.AccountDeleteForm>
  )
}

export default AccountDeleteForm;
