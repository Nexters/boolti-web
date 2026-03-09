import { Button, palette, RadioButton, TextField, TextButton } from '@boolti/ui';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Tooltip } from 'react-tooltip';
import Styled from './TicketForm.styles';
import QuantityStepperInput from './QuantityStepperInput';
import { WarningIcon } from '@boolti/ui/src/components/Toast/icons';

export interface TicketSettingFormInputs {
  name: string;
  price?: string;
  totalForSale: string;
  isPaused: boolean;
}

type DeleteDisabledReason = 'soldAtLeastOnce' | 'singleTicket' | 'both';

interface TicketSettingFormProps {
  ticketType: 'sales' | 'invitation';
  defaultValues: {
    name: string;
    price?: number;
    totalForSale: number;
    quantity: number;
    isPaused: boolean;
  };
  latestSoldQuantity: number;
  soldAtLeastOnce?: boolean;
  onSubmit: SubmitHandler<TicketSettingFormInputs>;
  onDelete: () => void;
  isDeleteDisabled?: boolean;
  deleteDisabledReason?: DeleteDisabledReason;
}

const DELETE_DISABLED_TOOLTIPS: Record<DeleteDisabledReason, React.ReactNode> = {
  soldAtLeastOnce: (
    <>
      환불을 포함한 판매 이력이 있어 티켓 삭제가
      <br />
      불가합니다. 미판매를 원하시는 경우,
      <br />
      &apos;판매 설정&gt; 판매 중단&apos;을 선택해 주세요.
    </>
  ),
  singleTicket: (
    <>
      티켓 판매를 위해서는 최소 1개 이상의 티켓이
      <br />
      필요합니다. 해당 티켓의 삭제를 원하시는 경우,
      <br />새 일반 티켓을 먼저 생성해 주세요.
    </>
  ),
  both: (
    <>
      환불을 포함한 판매 이력이 있어 티켓 삭제가
      <br />
      불가합니다. 미판매를 원하시는 경우,
      <br />
      &apos;판매 설정&gt; 판매 중단&apos;을 선택해 주세요.
    </>
  ),
};

const TicketSettingForm = ({
  ticketType,
  defaultValues,
  latestSoldQuantity,
  soldAtLeastOnce = false,
  onSubmit,
  onDelete,
  isDeleteDisabled,
  deleteDisabledReason,
}: TicketSettingFormProps) => {
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    watch,
    formState: { isDirty, isValid },
  } = useForm<TicketSettingFormInputs>({
    mode: 'onChange',
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

  const initialSoldQuantityRef = useRef(defaultValues.totalForSale - defaultValues.quantity);
  const initialTotalForSaleRef = useRef(defaultValues.totalForSale);
  const [displayedSoldQuantity, setDisplayedSoldQuantity] = useState(
    defaultValues.totalForSale - defaultValues.quantity,
  );
  const [showConcurrencyBanner, setShowConcurrencyBanner] = useState(false);

  useEffect(() => {
    if (latestSoldQuantity !== initialSoldQuantityRef.current) {
      setShowConcurrencyBanner(true);
      setDisplayedSoldQuantity(latestSoldQuantity);
      setValue('totalForSale', String(initialTotalForSaleRef.current), {
        shouldDirty: true,
        shouldValidate: true,
      });
      initialSoldQuantityRef.current = latestSoldQuantity;
    }
  }, [latestSoldQuantity, setValue]);

  const isPaused = watch('isPaused');
  const totalForSaleValue = watch('totalForSale');
  const soldQuantity = displayedSoldQuantity;
  const totalForSaleMin =
    ticketType === 'invitation' && soldAtLeastOnce
      ? initialTotalForSaleRef.current
      : soldQuantity || 1;

  const validatePrice = (price?: string) => {
    if (!price) return false;
    const parsedPrice = Number(price);
    return parsedPrice >= 200 || parsedPrice === 0;
  };

  const handlePriceErrorMessage = (hasBlurred: boolean, price: string) => {
    if (hasBlurred && (!price || !validatePrice(price))) {
      return '0 또는 200 이상을 입력해 주세요.';
    }
    return '';
  };

  const handleFormSubmit: SubmitHandler<TicketSettingFormInputs> = (data) => {
    if (initialSoldQuantityRef.current !== latestSoldQuantity) {
      setShowConcurrencyBanner(true);
      setDisplayedSoldQuantity(latestSoldQuantity);
      setValue('totalForSale', String(initialTotalForSaleRef.current), {
        shouldDirty: true,
        shouldValidate: true,
      });
      initialSoldQuantityRef.current = latestSoldQuantity;
      return;
    }

    onSubmit(data);
  };

  return (
    <Styled.TicketForm onSubmit={handleSubmit(handleFormSubmit)}>
      {showConcurrencyBanner && (
        <Styled.ConcurrencyBanner>
          <WarningIcon />
          판매된 수량이 업데이트 되었어요. 수량을 다시 확인해 주세요.
        </Styled.ConcurrencyBanner>
      )}
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
              disabled={isPaused}
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
                disabled={isPaused || soldAtLeastOnce}
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
            <QuantityStepperInput
              min={totalForSaleMin}
              disabled={isPaused}
              disableDecrement={Number(totalForSaleValue) <= totalForSaleMin}
              {...register('totalForSale', { required: true })}
              onBlur={(event) => {
                register('totalForSale', { required: true }).onBlur(event);
                setHasBlurred((prev) => ({ ...prev, totalForSale: true }));
              }}
              onIncrement={() => {
                const current = Number(getValues('totalForSale')) || 0;
                setValue('totalForSale', String(current + 1), {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
              onDecrement={() => {
                const current = Number(getValues('totalForSale')) || 0;
                const newVal = Math.max(totalForSaleMin, current - 1);
                setValue('totalForSale', String(newVal), {
                  shouldDirty: true,
                  shouldValidate: true,
                });
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
          data-tooltip-id="delete-ticket-tooltip-multiline"
          type="button"
          colorTheme="netural"
          style={{
            color: isDeleteDisabled ? palette.grey.g50 : palette.grey.g90,
            textUnderlineOffset: '4px',
            textDecoration: 'underline',
            cursor: isDeleteDisabled ? 'not-allowed' : 'pointer',
            padding: '0',
          }}
          size="small"
          disabled={isDeleteDisabled}
          onClick={onDelete}
        >
          티켓 삭제
        </TextButton>
        <Button
          type="submit"
          size="bold"
          colorTheme="primary"
          disabled={isPaused ? !isDirty || !isValid : !isValid}
        >
          저장하기
        </Button>
      </Styled.TicketFormFooter>
      {isDeleteDisabled && deleteDisabledReason && (
        <Tooltip
          id="delete-ticket-tooltip-multiline"
          place="top-start"
          style={{
            backgroundColor: palette.grey.g90,
            padding: '8px 12px',
            borderRadius: '4px',
            lineHeight: '22px',
            fontSize: '14px',
            fontWeight: 400,
          }}
        >
          {DELETE_DISABLED_TOOLTIPS[deleteDisabledReason]}
        </Tooltip>
      )}
    </Styled.TicketForm>
  );
};

export default TicketSettingForm;
