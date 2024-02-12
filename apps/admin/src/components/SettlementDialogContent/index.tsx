import { usePutUserSettlementAccountInfo } from '@boolti/api';
import { Button, TextField, useToast } from '@boolti/ui';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { bankItems } from '~/constants/bankItems';
import { useBodyScrollLock } from '~/hooks/useBodyScrollLock';
import { validateAccountHolder, validateAccountNumber } from '~/utils/validation';

import Styled from './SettlementDialogContent.styles';

const titles = [
  '은행을 선택해 주세요.',
  '계좌번호와 예금주를 입력해 주세요.',
  '입력하신 계좌 정보를 다시 한 번 확인해주세요.',
];

interface Props {
  onClose?: VoidFunction;
}

interface SettlementDialogFormInputs {
  bankCode: string;
  accountHolder: string;
  accountNumber: string;
}

const SettlementDialogContent = ({ onClose }: Props) => {
  const toast = useToast();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { setValue, register, handleSubmit, watch } = useForm<SettlementDialogFormInputs>();
  const currentBankCode = watch('bankCode');
  const currentBankName = bankItems.find(({ code }) => code === currentBankCode)?.name;
  const currentAccountHolder = watch('accountHolder');
  const currentAccountNumber = watch('accountNumber');
  const [accountHolderError, setAccountHolderError] = useState<string | undefined>(undefined);
  const [accountNumberError, setAccountNumberError] = useState<string | undefined>(undefined);

  const { mutate } = usePutUserSettlementAccountInfo();

  const onSubmit: SubmitHandler<SettlementDialogFormInputs> = (data) => {
    mutate(data, {
      onSuccess: () => {
        toast.success('정산 계좌를 저장했습니다.');
        onClose?.();
      },
    });
  };

  useBodyScrollLock();

  return (
    <Styled.Container>
      <Styled.Title>{titles[currentStepIndex]}</Styled.Title>
      {currentStepIndex === 0 && (
        <Styled.BankList>
          {bankItems.map((bankItem) => (
            <Styled.BankItem key={bankItem.name}>
              <Styled.BankItemButton
                type="button"
                isUndefined={currentBankCode === undefined}
                isSelected={currentBankCode === bankItem.code}
                onClick={() => {
                  setValue('bankCode', bankItem.code);
                }}
              >
                <Styled.BankIcon>{<bankItem.icon />}</Styled.BankIcon>
                <Styled.BankName>{bankItem.name}</Styled.BankName>
              </Styled.BankItemButton>
            </Styled.BankItem>
          ))}
        </Styled.BankList>
      )}
      {currentStepIndex === 1 && (
        <>
          <Styled.InputContainer>
            <Styled.InputLabel>계좌번호</Styled.InputLabel>
            <TextField
              placeholder="계좌번호를 입력해 주세요"
              size="small"
              inputType="text"
              errorMessage={accountNumberError}
              {...register('accountNumber', {
                required: true,
                onBlur(event) {
                  const value = event.target.value;
                  setAccountNumberError(
                    validateAccountNumber(value) && !isNaN(Number(value))
                      ? undefined
                      : '계좌번호를 확인 후 다시 입력해 주세요.',
                  );
                },
              })}
            />
          </Styled.InputContainer>
          <Styled.InputContainer>
            <Styled.InputLabel>예금주</Styled.InputLabel>
            <TextField
              placeholder="예금주 이름을 입력해 주세요"
              size="small"
              inputType="text"
              errorMessage={accountHolderError}
              {...register('accountHolder', {
                required: true,
                onBlur(event) {
                  setAccountHolderError(
                    validateAccountHolder(event.target.value)
                      ? undefined
                      : '한글만 입력 가능합니다.',
                  );
                },
              })}
            />
          </Styled.InputContainer>
        </>
      )}
      {currentStepIndex === 2 && (
        <Styled.ConfirmContainer>
          <Styled.ConfrimTextContainer>
            <Styled.ConfirmTextLabel>은행</Styled.ConfirmTextLabel>
            <Styled.ConfrimTextValue>{currentBankName}</Styled.ConfrimTextValue>
          </Styled.ConfrimTextContainer>
          <Styled.ConfrimTextContainer>
            <Styled.ConfirmTextLabel>계좌번호</Styled.ConfirmTextLabel>
            <Styled.ConfrimTextValue>{currentAccountNumber}</Styled.ConfrimTextValue>
          </Styled.ConfrimTextContainer>
          <Styled.ConfrimTextContainer>
            <Styled.ConfirmTextLabel>예금주</Styled.ConfirmTextLabel>
            <Styled.ConfrimTextValue>{currentAccountHolder}</Styled.ConfrimTextValue>
          </Styled.ConfrimTextContainer>
        </Styled.ConfirmContainer>
      )}
      <Styled.ButtonContainer>
        {currentStepIndex !== 0 && (
          <Button
            type="button"
            colorTheme="line"
            size="bold"
            onClick={() => {
              setCurrentStepIndex((prev) => prev - 1);
            }}
          >
            이전으로
          </Button>
        )}
        <Button
          type="button"
          colorTheme="primary"
          size="bold"
          disabled={
            (currentStepIndex === 0 && !currentBankName) ||
            (currentStepIndex === 1 &&
              (currentAccountNumber === '' ||
                currentAccountHolder === '' ||
                !!accountHolderError ||
                !!accountNumberError))
          }
          onClick={(event) => {
            if (currentStepIndex === 1 && (accountHolderError || accountNumberError)) {
              return;
            }
            if (currentStepIndex === 2) {
              handleSubmit(onSubmit)(event);
              return;
            }
            setCurrentStepIndex((prev) => prev + 1);
          }}
        >
          {currentStepIndex === 2 ? '저장하기' : '다음으로'}
        </Button>
      </Styled.ButtonContainer>
    </Styled.Container>
  );
};

export default SettlementDialogContent;
