import { Button, TextField, useToast } from '@boolti/ui';

import { bankItems } from '~/constants/bankItems';

import Styled from './SettlementDialogContent.styles';
import { useRef, useState } from 'react';

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
  const formValue = useRef<{ orgName?: string; accountNumber?: string; accountHolder?: string }>(
    {},
  );
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [accountHolder, setAccountHolder] = useState<string>('');
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
              onChange={(event) => {
                setAccountNumber(event.target.value);
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
            <Styled.ConfrimTextValue>{formValue.current.orgName}</Styled.ConfrimTextValue>
          </Styled.ConfrimTextContainer>
          <Styled.ConfrimTextContainer>
            <Styled.ConfirmTextLabel>계좌번호</Styled.ConfirmTextLabel>
            <Styled.ConfrimTextValue>{formValue.current.accountNumber}</Styled.ConfrimTextValue>
          </Styled.ConfrimTextContainer>
          <Styled.ConfrimTextContainer>
            <Styled.ConfirmTextLabel>계좌주</Styled.ConfirmTextLabel>
            <Styled.ConfrimTextValue>{formValue.current.accountNumber}</Styled.ConfrimTextValue>
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
            (currentStepIndex === 1 && (accountNumber === '' || accountHolder === ''))
          }
          onClick={() => {
            if (currentStepIndex === 0 && selectedBank) {
              formValue.current.orgName = selectedBank;
            }
            if (currentStepIndex === 1) {
              formValue.current.accountHolder = accountHolder;
              formValue.current.accountNumber = accountNumber;
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
