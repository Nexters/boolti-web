import {
  useBankAccountList,
  usePutShowSettlementBankAccount,
  useShowDetail,
  useShowSettlementInfo,
  useUploadBankAccountCopyPhoto,
  useUploadIDCardPhotoFile,
} from '@boolti/api';
import { PlusIcon } from '@boolti/icon';
import { Select, useDialog } from '@boolti/ui';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import FileInput from '~/components/FileInput/FileInput';
import SettlementDialogContent from '~/components/SettlementDialogContent';
import ShowDetailLayout from '~/components/ShowDetailLayout';

import Styled from './ShowSettlementPage.styles';

const ShowSettlementPage = () => {
  const params = useParams<{ showId: string }>();

  const [account, setAccount] = useState<string | null>(null);

  const settlementDialog = useDialog();

  const { data: show } = useShowDetail(Number(params!.showId));
  const { data: settlementInfo } = useShowSettlementInfo(Number(params!.showId));
  const { data: bankAccountList, refetch: refetchBankAccountList } = useBankAccountList();
  // const { data: lastSettlementEvent } = useShowLastSettlementEvent(Number(params!.showId));
  const putShowSettlementBankAccountMutation = usePutShowSettlementBankAccount(
    Number(params!.showId),
  );
  const uploadIDCardPhotoFileMutation = useUploadIDCardPhotoFile(Number(params!.showId));
  const uploadBankAccountCopyPhotoMutation = useUploadBankAccountCopyPhoto(Number(params!.showId));

  const bankAccountOptions =
    bankAccountList?.map((bankAccount) => ({
      value: `${bankAccount.bankAccountId}`,
      label: `${bankAccount.bankName} ${bankAccount.bankAccountNumber} ${bankAccount.bankAccountHolder}`,
    })) ?? [];

  useEffect(() => {
    if (settlementInfo?.bankAccount?.bankAccountId) {
      setAccount(`${settlementInfo.bankAccount.bankAccountId}`);
    }
  }, [settlementInfo?.bankAccount?.bankAccountId]);

  if (!show) return null;

  return (
    <ShowDetailLayout showName={show.name}>
      <Styled.ShowSettlementPage>
        <Styled.Notice>
          개인정보 처리방침을 확인 후 정산에 필요한 정보를 업로드해 주세요.{' '}
          <Styled.Link
            href="https://boolti.notion.site/5f73661efdcd4507a1e5b6827aa0da70"
            target="_blank"
            rel="noreferrer noopener nofollow"
          >
            개인정보 처리방침
          </Styled.Link>
          <br />
          업로드 시 불티의 개인정보 처리방침에 동의한 것으로 간주하며, 정보는 정산 및 세금계산서
          발급에 사용됩니다.
        </Styled.Notice>
        {settlementInfo && (
          <>
            <Styled.PageSection>
              <Styled.PageTitle>정산 정보</Styled.PageTitle>
              <Styled.FormGroupContainer>
                <Styled.FormGroup>
                  <Styled.FormGroupLabel>
                    <Styled.FormGroupLabelText>
                      신분증 또는 사업자등록증 사본
                    </Styled.FormGroupLabelText>
                    <Styled.FormGroupLabelSubText>
                      (개인 - 신분증 / 사업자 - 사업자등록증)
                    </Styled.FormGroupLabelSubText>
                  </Styled.FormGroupLabel>
                  <FileInput
                    description="10MB 미만 jpg, png, pdf 형식"
                    downloadUrl={settlementInfo?.idCardPhotoFile?.url}
                    initialFileName={settlementInfo?.idCardPhotoFile?.fileName}
                    accept="image/jpeg, image/png, .pdf"
                    onChange={async (event) => {
                      if (event.target.files?.[0]) {
                        uploadIDCardPhotoFileMutation.mutateAsync(event.target.files[0]);
                      }
                    }}
                  />
                </Styled.FormGroup>
                <Styled.FormGroup>
                  <Styled.FormGroupLabel>
                    <Styled.FormGroupLabelText>정산 계좌</Styled.FormGroupLabelText>
                  </Styled.FormGroupLabel>
                  <Styled.SelectContainer>
                    <Select
                      value={account}
                      options={bankAccountOptions}
                      placeholder="계좌 선택"
                      additionalButton={
                        <Styled.AccountAddButton>
                          계좌 추가 <PlusIcon />
                        </Styled.AccountAddButton>
                      }
                      onSelect={(option) => {
                        setAccount(option.value);
                        putShowSettlementBankAccountMutation.mutateAsync(Number(option.value));
                      }}
                      onAdditionalButtonClick={() => {
                        settlementDialog.open({
                          title: '정산 계좌 입력하기',
                          content: (
                            <SettlementDialogContent
                              onClose={settlementDialog.close}
                              onSubmitSuccess={() => {
                                refetchBankAccountList();
                              }}
                            />
                          ),
                        });
                      }}
                    />
                  </Styled.SelectContainer>
                </Styled.FormGroup>
                <Styled.FormGroup>
                  <Styled.FormGroupLabel>
                    <Styled.FormGroupLabelText>통장 사본</Styled.FormGroupLabelText>
                  </Styled.FormGroupLabel>
                  <FileInput
                    description="10MB 미만 jpg, png, pdf 형식"
                    downloadUrl={settlementInfo?.settlementBankAccountPhotoFile?.url}
                    initialFileName={settlementInfo?.settlementBankAccountPhotoFile?.fileName}
                    accept="image/jpeg, image/png, .pdf"
                    onChange={async (event) => {
                      if (event.target.files?.[0]) {
                        uploadBankAccountCopyPhotoMutation.mutateAsync(event.target.files[0]);
                      }
                    }}
                  />
                </Styled.FormGroup>
              </Styled.FormGroupContainer>
            </Styled.PageSection>
            <Styled.PageSectionDivider />
            <Styled.PageSection>
              <Styled.PageTitle>정산 내역서</Styled.PageTitle>
              <Styled.PageDescription>
                정산 내역서는 티켓 판매종료 후 생성돼요
              </Styled.PageDescription>
            </Styled.PageSection>
          </>
        )}
      </Styled.ShowSettlementPage>
    </ShowDetailLayout>
  );
};

export default ShowSettlementPage;
