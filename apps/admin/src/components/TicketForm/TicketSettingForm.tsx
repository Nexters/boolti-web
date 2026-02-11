import { Button, RadioButton, TextField, TextButton } from '@boolti/ui';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Styled from './TicketForm.styles';

export interface TicketSettingFormInputs {
  name: string;
  price?: string;
  totalForSale: string;
  isPaused: boolean;
}

interface TicketSettingFormProps {
  ticketType: 'sales' | 'invitation';
  defaultValues: {
    name: string;
    price?: number;
    totalForSale: number;
    quantity: number;
    isPaused: boolean;
  };
  onSubmit: SubmitHandler<TicketSettingFormInputs>;
  onDelete: () => void;
  isDeleteDisabled?: boolean;
}

const TicketSettingForm = ({
  ticketType,
  defaultValues,
  onSubmit,
  onDelete,
  isDeleteDisabled,
}: TicketSettingFormProps) => {
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    watch,
    formState: { isDirty, isValid },
  } = useForm<TicketSettingFormInputs>({
    defaultValues: {
      name: defaultValues.name,
      price: defaultValues.price?.toString(),
      totalForSale: defaultValues.totalForSale.toString(),
      isPaused: defaultValues.isPaused,
    },
  });

  const [hasBlurred, setHasBlurred] = useState<Record<string, boolean>>({
    name: false,
    price: false,
    totalForSale: false,
  });

  const isPaused = watch('isPaused');
  const soldQuantity = defaultValues.totalForSale - defaultValues.quantity;

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
      <Styled.TicketFormRow>
        <Styled.TicketFormContent>
          <Styled.TicketFormLabel>판매 설정</Styled.TicketFormLabel>
          <Styled.RadioGroup>
            <RadioButton
              name="isPaused"
              label="판매 운영"
              checked={!isPaused}
              onChange={() => setValue('isPaused', false, { shouldDirty: true })}
            />
            <RadioButton
              name="isPaused"
              label="판매 중단"
              checked={isPaused}
              onChange={() => setValue('isPaused', true, { shouldDirty: true })}
            />
          </Styled.RadioGroup>
        </Styled.TicketFormContent>
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
      {ticketType === 'sales' && (
        <Styled.TicketFormRow>
          <Styled.TicketFormContent>
            <Styled.TicketFormLabel>가격</Styled.TicketFormLabel>
            <Styled.TextField>
              <TextField
                inputType="number"
                size="big"
                placeholder="0"
                min={0}
                {...register('price', { required: ticketType === 'sales' })}
                onChange={(event) => {
                  register('price', {
                    required: ticketType === 'sales',
                    validate: validatePrice,
                  }).onChange(event);
                }}
                onBlur={(event) => {
                  register('price', { required: ticketType === 'sales' }).onBlur(event);
                  setHasBlurred((prev) => ({ ...prev, price: true }));
                }}
                errorMessage={handlePriceErrorMessage(hasBlurred.price, getValues('price') ?? '')}
              />
              <Styled.TextFieldSuffix>원</Styled.TextFieldSuffix>
            </Styled.TextField>
          </Styled.TicketFormContent>
        </Styled.TicketFormRow>
      )}
      <Styled.QuantityRow>
        <Styled.SoldQuantityContent>
          <Styled.TicketFormLabel>판매된 수량</Styled.TicketFormLabel>
          <Styled.QuantityDisplay>
            {soldQuantity}
            <Styled.TextFieldSuffix>매</Styled.TextFieldSuffix>
          </Styled.QuantityDisplay>
        </Styled.SoldQuantityContent>
        <Styled.TotalQuantityContent>
          <Styled.TicketFormLabel>총 수량</Styled.TicketFormLabel>
          <Styled.TextField>
            <TextField
              inputType="number"
              size="big"
              min={soldQuantity || 1}
              {...register('totalForSale', { required: true })}
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
        </Styled.TotalQuantityContent>
      </Styled.QuantityRow>

      <Styled.TicketFormFooter>
        <TextButton
          type="button"
          colorTheme="netural"
          style={{
            color: '#282B33',
            textUnderlineOffset: '4px',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
          size="small"
          disabled={isDeleteDisabled}
          onClick={onDelete}
        >
          티켓 삭제
        </TextButton>
        <Button type="submit" size="bold" colorTheme="primary" disabled={!isDirty || !isValid}>
          저장하기
        </Button>
      </Styled.TicketFormFooter>
    </Styled.TicketForm>
  );
};

export default TicketSettingForm;
