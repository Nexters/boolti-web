import { useBankAccountList } from '@boolti/api';
import { CloseIcon } from '@boolti/icon';
import { Button, TextField, useToast } from '@boolti/ui';
import { useCallback, useMemo, useState } from 'react';
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
  onSubmit: SubmitHandler<SettlementDialogFormInputs>;
}

interface SettlementDialogFormInputs {
  bankCode: string;
  accountHolder: string;
  accountNumber: string;
}

const SettlementDialogContent = ({ onClose, onSubmit }: Props) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { setValue, register, handleSubmit, watch } = useForm<SettlementDialogFormInputs>();
  const currentBankCode = watch('bankCode');
  const currentBankName = bankItems.find(({ code }) => code === currentBankCode)?.name;
  const currentAccountHolder = watch('accountHolder');
  const currentAccountNumber = watch('accountNumber');
  const [accountHolderError, setAccountHolderError] = useState<string | undefined>(undefined);
  const [accountNumberError, setAccountNumberError] = useState<string | undefined>(undefined);

  const { data: bankAccountList } = useBankAccountList();

  const toast = useToast();

  const submitHandler: SubmitHandler<SettlementDialogFormInputs> = useCallback(
    async (data) => {
      onSubmit(data);
    },
    [onSubmit],
  );

  const Buttons = useMemo(() => {
    return (
      <>
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
                currentAccountNumber === undefined ||
                currentAccountHolder === '' ||
                currentAccountHolder === undefined ||
                !!accountHolderError ||
                !!accountNumberError))
          }
          onClick={(event) => {
            if (currentStepIndex === 1 && (accountHolderError || accountNumberError)) {
              return;
            }

            if (currentStepIndex === 1) {
              const isDuplicatedBankAccount = !!bankAccountList?.find(
                (bankAccount) =>
                  bankAccount.bankCode === currentBankCode &&
                  bankAccount.bankAccountNumber === currentAccountNumber,
              );

              if (isDuplicatedBankAccount) {
                toast.error('이미 등록된 계좌입니다.');
                return;
              }
            }

            if (currentStepIndex === 2) {
              handleSubmit(submitHandler)(event);
              return;
            }
            setCurrentStepIndex((prev) => prev + 1);
          }}
        >
          {currentStepIndex === 2 ? '저장하기' : '다음으로'}
        </Button>
      </>
    );
  }, [
    accountHolderError,
    accountNumberError,
    currentAccountHolder,
    currentAccountNumber,
    currentBankName,
    currentStepIndex,
    bankAccountList,
    currentBankCode,
    toast,
    handleSubmit,
    submitHandler,
  ]);
  useBodyScrollLock();

  return (
    <Styled.Container>
      <Styled.Form>
        <Styled.MobileTitle>
          정산 계좌 입력하기
          <Styled.MobileCloseButton onClick={onClose}>
            <CloseIcon />
          </Styled.MobileCloseButton>
        </Styled.MobileTitle>
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
          <Styled.MobileBottomContainer>
            <Styled.InputContainer>
              <Styled.InputLabel>계좌번호</Styled.InputLabel>
              <TextField
                className="text-field"
                placeholder="계좌번호를 입력해 주세요"
                size="small"
                inputType="text"
                errorMessage={accountNumberError}
                {...register('accountNumber', {
                  required: true,
                  onBlur(event) {
                    const value = event.target.value;
                    let errorMessage: undefined | string = undefined;

                    if (value === '') {
                      errorMessage = '필수 입력사항입니다.';
                    } else if (!validateAccountNumber(value) || isNaN(Number(value))) {
                      errorMessage = '계좌번호를 확인 후 다시 입력해 주세요.';
                    }

                    setAccountNumberError(errorMessage);
                  },
                })}
              />
            </Styled.InputContainer>
            <Styled.InputContainer>
              <Styled.InputLabel>예금주</Styled.InputLabel>
              <TextField
                className="text-field"
                placeholder="예금주 이름을 입력해 주세요"
                size="small"
                inputType="text"
                errorMessage={accountHolderError}
                {...register('accountHolder', {
                  required: true,
                  onBlur(event) {
                    const value = event.target.value;
                    let errorMessage: undefined | string = undefined;
                    if (value === '') {
                      errorMessage = '필수 입력사항입니다.';
                    } else if (!validateAccountHolder(value)) {
                      errorMessage = '한글만 입력 가능합니다.';
                    }
                    setAccountHolderError(errorMessage);
                  },
                })}
              />
            </Styled.InputContainer>
          </Styled.MobileBottomContainer>
        )}
        {currentStepIndex === 2 && (
          <Styled.MobileBottomContainer>
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
          </Styled.MobileBottomContainer>
        )}
        <Styled.MobileButtonContainer>{Buttons}</Styled.MobileButtonContainer>
        <Styled.ButtonContainer>{Buttons}</Styled.ButtonContainer>
      </Styled.Form>
    </Styled.Container>
  );
};

export default SettlementDialogContent;
