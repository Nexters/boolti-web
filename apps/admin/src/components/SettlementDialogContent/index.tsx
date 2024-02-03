import { Button } from '@boolti/ui';

import { bankItems } from '~/constants/bankItems';

import Styled from './SettlementDialogContent.styles';
import { useState } from 'react';

const SettlementDialogContent = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  return (
    <Styled.Container>
      {
        <Styled.Title>
          {!selectedBank ? '은행을 선택해 주세요.' : '계좌번호와 계좌주를 입력해 주세요.'}
        </Styled.Title>
      }
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
      <Styled.ButtonContainer>
        {currentStepIndex !== 0 && (
          <Button type="button" colorTheme="line" size="bold">
            이전으로
          </Button>
        )}
        <Button
          type="button"
          colorTheme="primary"
          size="bold"
          disabled={!selectedBank}
          onClick={() => {
            setCurrentStepIndex((prev) => prev + 1);
          }}
        >
          다음으로
        </Button>
      </Styled.ButtonContainer>
    </Styled.Container>
  );
};

export default SettlementDialogContent;
