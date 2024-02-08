import { Button, TextField, useToast } from '@boolti/ui';
import { useState } from 'react';

import { bankItems } from '~/constants/bankItems';
import { useBodyScrollLock } from '~/hooks/useBodyScrollLock';
import { validateAccountHolder, validateAccountNumber } from '~/utils/validation';

import Styled from './SettlementDialogContent.styles';

const titles = [
  '은행을 선택해 주세요.',
  '계좌번호와 계좌주를 입력해 주세요.',
  '입력하신 계좌 정보를 다시 한 번 확인해주세요.',
];

interface Props {
  onClose?: VoidFunction;
}

const SettlementDialogContent = ({ onClose }: Props) => {
  const toast = useToast();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [accountHolder, setAccountHolder] = useState<string>('');
  const [accountHolderError, setAccountHolderError] = useState<string | undefined>(undefined);
  const [accountNumberError, setAccountNumberError] = useState<string | undefined>(undefined);

  useBodyScrollLock();

  return (
    <Styled.Container>
      <Styled.Title>{titles[currentStepIndex]}</Styled.Title>
      {currentStepIndex === 0 && (
        <Styled.BankList>
          {bankItems.map((bankItem) => (
            <Styled.BankItem key={bankItem.name}>
              <Styled.BankItemButton
                isNull={selectedBank === null}
                isSelected={selectedBank === bankItem.name}
                onClick={() => {
                  setSelectedBank(bankItem.name);
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
              value={accountNumber}
              errorMessage={accountNumberError}
              onBlur={(event) => {
                setAccountNumberError(
                  validateAccountNumber(event.target.value)
                    ? undefined
                    : '계좌번호를 확인 후 다시 입력해 주세요.',
                );
              }}
              onChange={(event) => {
                const value = event.target.value;
                if (!isNaN(Number(value))) {
                  setAccountNumber(value);
                }
              }}
            />
          </Styled.InputContainer>
          <Styled.InputContainer>
            <Styled.InputLabel>계좌주</Styled.InputLabel>
            <TextField
              placeholder="계좌주 이름을 입력해 주세요"
              size="small"
              inputType="text"
              value={accountHolder}
              errorMessage={accountHolderError}
              onBlur={(event) => {
                setAccountHolderError(
                  validateAccountHolder(event.target.value) ? undefined : '한글만 입력 가능합니다.',
                );
              }}
              onChange={(event) => {
                setAccountHolder(event.target.value);
              }}
            />
          </Styled.InputContainer>
        </>
      )}
      {currentStepIndex === 2 && (
        <Styled.ConfirmContainer>
          <Styled.ConfrimTextContainer>
            <Styled.ConfirmTextLabel>은행</Styled.ConfirmTextLabel>
            <Styled.ConfrimTextValue>{selectedBank}</Styled.ConfrimTextValue>
          </Styled.ConfrimTextContainer>
          <Styled.ConfrimTextContainer>
            <Styled.ConfirmTextLabel>계좌번호</Styled.ConfirmTextLabel>
            <Styled.ConfrimTextValue>{accountNumber}</Styled.ConfrimTextValue>
          </Styled.ConfrimTextContainer>
          <Styled.ConfrimTextContainer>
            <Styled.ConfirmTextLabel>계좌주</Styled.ConfirmTextLabel>
            <Styled.ConfrimTextValue>{accountHolder}</Styled.ConfrimTextValue>
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
            (currentStepIndex === 0 && !selectedBank) ||
            (currentStepIndex === 1 &&
              (accountNumber === '' ||
                accountHolder === '' ||
                !!accountHolderError ||
                !!accountNumberError))
          }
          onClick={() => {
            if (accountHolderError || accountNumberError) {
              return;
            }
            if (currentStepIndex === 2) {
              toast.success('정산 계좌를 저장했습니다.');
              onClose?.();
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
