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

  // TODO: react-hook-form의 에러 기능을 사용하도록 수정
  const [hasBlurred, setHasBlurred] = useState<Record<keyof SalesTicketFormInputs, boolean>>({
    name: false,
    price: false,
    totalForSale: false,
  });

  const validatePrice = (price: string) => {
    const parsedPrice = Number(price);
    return parsedPrice >= 200 || parsedPrice === 0;
  };

  const handlePriceErrorMessage = (hasBlurred: boolean, price: string) => {
    if (hasBlurred && (!price || !validatePrice(price))) {
      return '0원 또는 200원 이상을 입력해 주세요.';
    }
    return '';
  };

  return (
    <Styled.TicketForm onSubmit={handleSubmit(onSubmit)}>
      <Styled.TicketFormDescription>
        <Styled.Description>만들고 싶은 티켓 정보를 입력해 주세요.</Styled.Description>
        <Styled.SubDescription>
          * 퀵계좌이체 지원을 위해 유료 티켓은 200원 이상 입력이 필요합니다.{'\n'}* 무료 티켓 생성을
          원하시면 0원을 입력해 주세요.
        </Styled.SubDescription>
      </Styled.TicketFormDescription>
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
              onChange={(event) => {
                register('price', {
                  required: true,
                  validate: validatePrice,
                }).onChange(event);
              }}
              onBlur={(event) => {
                register('price', { required: true }).onBlur(event);
                setHasBlurred((prev) => ({ ...prev, price: true }));
              }}
              errorMessage={handlePriceErrorMessage(hasBlurred.price, getValues('price'))}
            />
            <Styled.TextFieldSuffix>원</Styled.TextFieldSuffix>
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

export default SalesTicketForm;
