import { Button, TextField } from '@boolti/ui';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Styled from './TicketForm.styles';

export interface SalesTicketFormInputs {
  name: string;
  price: string;
  totalForSale: string;
}

interface SalesTicketFormProps {
  onSubmit: SubmitHandler<SalesTicketFormInputs>;
}

const SalesTicketForm = ({ onSubmit }: SalesTicketFormProps) => {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { isDirty, isValid },
  } = useForm<SalesTicketFormInputs>();

  const [hasBlurred, setHasBlurred] = useState<Record<keyof SalesTicketFormInputs, boolean>>({
    name: false,
    price: false,
    totalForSale: false,
  });

  return (
    <Styled.TicketForm onSubmit={handleSubmit(onSubmit)}>
      <Styled.TicketFormRow>
        <Styled.Description>만들고 싶은 티켓 정보를 입력해 주세요.</Styled.Description>
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
          <Styled.TicketFormLabel>가격</Styled.TicketFormLabel>
          <Styled.TextField>
            <TextField
              inputType="number"
              size="big"
              placeholder="0"
              min={0}
              {...register('price', { required: true })}
              onBlur={(event) => {
                register('price', { required: true }).onBlur(event);
                setHasBlurred((prev) => ({ ...prev, price: true }));
              }}
              errorMessage={hasBlurred.price && !getValues('price') ? '필수 입력사항입니다.' : ''}
            />
            <Styled.TextFieldSuffix>원</Styled.TextFieldSuffix>
          </Styled.TextField>
        </Styled.TicketFormContent>
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

export default SalesTicketForm;
