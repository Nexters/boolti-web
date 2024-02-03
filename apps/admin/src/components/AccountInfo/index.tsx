import { Button, useDialog } from '@boolti/ui';
import Styled from './AccountInfo.styles';
import SettlementDialogContent from '../SettlementDialogContent';

interface Props {
  orgName?: string;
  accountNumber?: string;
  accountHolder?: string;
}

const AccountInfo = ({ orgName, accountHolder, accountNumber }: Props) => {
  const { open } = useDialog();
  return (
    <Styled.Container>
      <Styled.Title>정산 계좌 정보</Styled.Title>
      <Styled.Description>빠른 정산을 위해서는 정확한 계좌 정보가 필요해요.</Styled.Description>
      <Styled.AccountContainer>
        {orgName && <Styled.AccountText>{orgName}</Styled.AccountText>}
        {accountNumber && <Styled.AccountText>{accountNumber}</Styled.AccountText>}
        {accountHolder && <Styled.AccountText>{accountHolder}</Styled.AccountText>}
        <Button
          onClick={() => {
            open({ title: '정산 계좌 입력하기', content: <SettlementDialogContent /> });
          }}
          type="button"
          colorTheme="netural"
          size="regular"
        >
          {accountNumber ? '변경하기' : '입력하기'}
        </Button>
      </Styled.AccountContainer>
    </Styled.Container>
  );
};

export default AccountInfo;
