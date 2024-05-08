import { queryKeys, usePutUserSettlementAccountInfo, useQueryClient } from '@boolti/api';
import { Button, useDialog, useToast } from '@boolti/ui';

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
  const toast = useToast();
  const queryClient = useQueryClient();

  const putUserSettlementAccountInfoMutation = usePutUserSettlementAccountInfo();

  return (
    <Styled.Container>
      <Styled.Title hasAccountInfo={Boolean(bankName && bankAccountHolder && bankAccountNumber)}>
        정산 계좌 정보
      </Styled.Title>
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
            content: (
              <SettlementDialogContent
                onClose={close}
                onSubmit={async (data) => {
                  try {
                    await putUserSettlementAccountInfoMutation.mutateAsync(data);
                    toast.success('정산 계좌를 저장했습니다.');
                    await queryClient.invalidateQueries({
                      queryKey: queryKeys.user.accountInfo.queryKey,
                    });
                  } catch (error) {
                    toast.error('잠시 후에 다시 시도하세요.');
                  }
                }}
              />
            ),
          });
        }}
        type="button"
        colorTheme="netural"
        size="regular"
      >
        {bankAccountNumber ? '변경하기' : '입력하기'}
      </Button>
    </Styled.Container>
  );
};

export default AccountInfo;
