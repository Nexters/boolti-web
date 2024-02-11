import { Button, useDialog } from '@boolti/ui';

import SettlementDialogContent from '../SettlementDialogContent';
import Styled from './AccountInfo.styles';

interface Props {
  bankName?: string;
  bankAccountNumber?: string;
  bankAccountHolder?: string;
}

const AccountInfo = ({ bankName, bankAccountHolder, bankAccountNumber }: Props) => {
  const { open, close } = useDialog();
  return (
    <Styled.Container>
      <Styled.Title>정산 계좌 정보</Styled.Title>
      <Styled.Description>빠른 정산을 위해서는 정확한 계좌 정보가 필요해요.</Styled.Description>
      <Styled.AccountContainer>
        {bankName && <Styled.AccountText>{bankName}</Styled.AccountText>}
        {bankAccountNumber && <Styled.AccountText>{bankAccountNumber}</Styled.AccountText>}
        {bankAccountHolder && <Styled.AccountText>{bankAccountHolder}</Styled.AccountText>}
        <Button
          onClick={() => {
            open({
              title: '정산 계좌 입력하기',
              content: <SettlementDialogContent onClose={close} />,
            });
          }}
          type="button"
          colorTheme="netural"
          size="regular"
        >
          {bankAccountNumber ? '변경하기' : '입력하기'}
        </Button>
      </Styled.AccountContainer>
    </Styled.Container>
  );
};

export default AccountInfo;
