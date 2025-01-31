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
        공연을 삭제하시려면 정확한 공연명을 입력해 주세요.
        <br />* 삭제 시 작성했던 공연 정보는 전부 사라지며 복구할 수 없어요.
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
        <Button
          type="submit"
          size="bold"
          colorTheme="primary"
          disabled={watch('showName', '').length === 0}
        >
          삭제하기
        </Button>
      </Styled.ButtonContainer>
    </Styled.ShowDeleteForm>
  );
};

export default ShowDeleteForm;
