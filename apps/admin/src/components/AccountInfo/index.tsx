import { Button, useDialog } from '@boolti/ui';

import SettlementDialogContent from '../SettlementDialogContent';
import Styled from './AccountInfo.styles';

interface Props {
  bankName?: string;
  bankAccountNumber?: string;
  bankCode?: string;
  bankAccountHolder?: string;
}

const AccountInfo = ({ bankName, bankAccountHolder, bankAccountNumber }: Props) => {
  const { open, close } = useDialog();
  return (
    <Styled.Container>
      <Styled.Title hasAccountInfo={Boolean(bankName && bankAccountHolder && bankAccountNumber)}>
        정산 계좌 정보
      </Styled.Title>
      <Styled.AccountContainer>
        {bankName && bankAccountHolder && bankAccountNumber ? (
          <Styled.InfoContainer>
            <Styled.AccountText>{bankName}</Styled.AccountText>
            <Styled.AccountText>{bankAccountNumber}</Styled.AccountText>
            <Styled.AccountText>{bankAccountHolder}</Styled.AccountText>
          </Styled.InfoContainer>
        ) : (
          <Styled.Description>빠른 정산을 위해서는 정확한 계좌 정보가 필요해요.</Styled.Description>
        )}
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
