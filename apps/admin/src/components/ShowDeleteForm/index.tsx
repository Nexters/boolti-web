import { Button, TextField } from '@boolti/ui';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Styled from './ShowDeleteForm.styles';

export interface ShowDeleteFormInputs {
  showName: string;
}

interface ShowDeleteFormProps {
  showName: string;
  onSubmit: SubmitHandler<ShowDeleteFormInputs>;
}

const ShowDeleteForm = ({ showName, onSubmit }: ShowDeleteFormProps) => {
  const { register, handleSubmit, watch } = useForm<ShowDeleteFormInputs>();

  const [error, setError] = useState<string | null>(null);

  const onSubmitForm: SubmitHandler<ShowDeleteFormInputs> = (data) => {
    if (data.showName === showName) {
      onSubmit(data);

      return;
    }

    setError('정확한 공연명을 입력해주세요.');
  };

  return (
    <Styled.ShowDeleteForm onSubmit={handleSubmit(onSubmitForm)}>
      <Styled.Description>
        삭제한 공연은 다시 되돌릴 수 없습니다.
        <br />
        삭제하시려면 정확한 공연명을 입력해 주세요.
      </Styled.Description>
      <Styled.TextFieldContainer>
        <TextField
          inputType="text"
          size="big"
          placeholder="공연명을 입력해 주세요"
          errorMessage={error ?? undefined}
          {...register('showName', {
            required: true,
            onChange: () => {
              setError(null);
            },
          })}
        />
      </Styled.TextFieldContainer>
      <Styled.ButtonContainer>
        <Button type="button" size="bold" colorTheme="line">
          취소
        </Button>
        <Button
          type="submit"
          size="bold"
          colorTheme="primary"
          disabled={watch('showName', '').length === 0}
        >
          삭제
        </Button>
      </Styled.ButtonContainer>
    </Styled.ShowDeleteForm>
  );
};

export default ShowDeleteForm;
