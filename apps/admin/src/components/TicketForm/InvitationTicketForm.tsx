import { Button, TextField } from '@boolti/ui';
import { SubmitHandler, useForm } from 'react-hook-form';

import Styled from './TicketForm.styles';

export interface InvitationTicketFormInputs {
  name: string;
  totalForSale: number;
}

interface InvitationTicketFormProps {
  onSubmit: SubmitHandler<InvitationTicketFormInputs>;
}

const InvitationTicketForm = ({ onSubmit }: InvitationTicketFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { isDirty, isValid },
  } = useForm<InvitationTicketFormInputs>();

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
              {...register('totalForSale', { required: true, value: 1 })}
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
