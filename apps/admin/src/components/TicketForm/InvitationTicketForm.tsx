import { Button, TextField } from '@boolti/ui';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Styled from './TicketForm.styles';

export interface InvitationTicketFormInputs {
  name: string;
  totalForSale: string;
}

interface InvitationTicketFormProps {
  onSubmit: SubmitHandler<InvitationTicketFormInputs>;
}

const InvitationTicketForm = ({ onSubmit }: InvitationTicketFormProps) => {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { isDirty, isValid },
  } = useForm<InvitationTicketFormInputs>();

  // TODO: react-hook-form의 에러 기능을 사용하도록 수정
  const [hasBlurred, setHasBlurred] = useState<Record<keyof InvitationTicketFormInputs, boolean>>({
    name: false,
    totalForSale: false,
  });

  return (
    <Styled.TicketForm onSubmit={handleSubmit(onSubmit)}>
      <Styled.TicketFormRow>
        <Styled.Description>
          만들고 싶은 티켓 정보를 입력해 주세요.
          <br />
          입력하신 수량만큼 초청 코드가 발행됩니다.
        </Styled.Description>
      </Styled.TicketFormRow>
      <Styled.TicketFormRow>
        <Styled.TicketFormContent>
          <Styled.TicketFormLabel>티켓 이름</Styled.TicketFormLabel>
          <Styled.TextField>
            <TextField
              inputType="text"
              size="big"
              maxLength={12}
              placeholder="티켓 이름을 입력해 주세요 (12자 이내)"
              autoFocus
              {...register('name', { required: true })}
              onBlur={(event) => {
                register('name', { required: true }).onBlur(event);
                setHasBlurred((prev) => ({ ...prev, name: true }));
              }}
              errorMessage={
                hasBlurred.name && getValues('name') === '' ? '필수 입력사항입니다.' : ''
              }
            />
          </Styled.TextField>
        </Styled.TicketFormContent>
      </Styled.TicketFormRow>
      <Styled.TicketFormRow>
        <Styled.TicketFormContent>
          <Styled.TicketFormLabel>수량</Styled.TicketFormLabel>
          <Styled.TextField>
            <TextField
              inputType="number"
              size="big"
              min={1}
              {...register('totalForSale', { required: true, value: '1' })}
              onBlur={(event) => {
                register('totalForSale', { required: true }).onBlur(event);
                setHasBlurred((prev) => ({ ...prev, totalForSale: true }));
              }}
              errorMessage={
                hasBlurred.totalForSale && !getValues('totalForSale') ? '필수 입력사항입니다.' : ''
              }
            />
            <Styled.TextFieldSuffix>매</Styled.TextFieldSuffix>
          </Styled.TextField>
        </Styled.TicketFormContent>
      </Styled.TicketFormRow>
      <Styled.TicketFormButton>
        <Button type="submit" size="bold" colorTheme="primary" disabled={!isDirty || !isValid}>
          생성하기
        </Button>
      </Styled.TicketFormButton>
    </Styled.TicketForm>
  );
};

export default InvitationTicketForm;
