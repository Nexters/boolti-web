import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import {
  ShowSettlementEventResponse,
  useAddBankAccount,
  useBankAccountList,
  usePutShowSettlementBankAccount,
  useRequestSettlement,
  useShowDetail,
  useShowLastSettlementEvent,
  useShowSettlementInfo,
  useShowSettlementStatement,
  useUploadBankAccountCopyPhoto,
  useUploadIDCardPhotoFile,
} from '@boolti/api';
import { DownloadIcon, PlusIcon } from '@boolti/icon';
import { AgreeCheck, Button, Select, TextButton, useDialog, useToast } from '@boolti/ui';
import { useEffect, useMemo, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useParams } from 'react-router-dom';

import FileInput from '~/components/FileInput/FileInput';
import SettlementDialogContent from '~/components/SettlementDialogContent';
import ShowDetailLayout from '~/components/ShowDetailLayout';

import Styled from './ShowSettlementPage.styles';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const isSettlementStarted = (eventType?: ShowSettlementEventResponse['settlementEventType']) => {
  return eventType === 'SEND' || eventType === 'REQUEST' || eventType === 'DONE';
};

const ShowSettlementPage = () => {
  const params = useParams<{ showId: string }>();

  const [account, setAccount] = useState<string | null>(null);
  const [agreeChecked, setAgreeChecked] = useState<boolean>(false);
  const [numPages, setNumPages] = useState<number>(0);

  const settlementDialog = useDialog();
  const toast = useToast();

  const { data: show } = useShowDetail(Number(params!.showId));
  const { data: settlementInfo } = useShowSettlementInfo(Number(params!.showId));
  const { data: bankAccountList, refetch: refetchBankAccountList } = useBankAccountList();
  const { data: lastSettlementEvent } = useShowLastSettlementEvent(Number(params!.showId));
  const { data: settlementStatementBlob } = useShowSettlementStatement(Number(params!.showId));
  const putShowSettlementBankAccountMutation = usePutShowSettlementBankAccount(
    Number(params!.showId),
  );
  const uploadIDCardPhotoFileMutation = useUploadIDCardPhotoFile(Number(params!.showId));
  const uploadBankAccountCopyPhotoMutation = useUploadBankAccountCopyPhoto(Number(params!.showId));
  const addBankAccountMutation = useAddBankAccount();
  const requestSettlementMutation = useRequestSettlement(Number(params!.showId));

  const settlementStatementFile = useMemo(() => {
    if (settlementStatementBlob) {
      return new Blob([settlementStatementBlob], { type: 'application/pdf' });
    }

    return null;
  }, [settlementStatementBlob]);

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
              <Styled.PageSectionHeader>
                <Styled.PageTitle>정산 정보</Styled.PageTitle>
              </Styled.PageSectionHeader>
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
                    readOnly={isSettlementStarted(lastSettlementEvent?.settlementEventType)}
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
                      disabled={isSettlementStarted(lastSettlementEvent?.settlementEventType)}
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
                              onSubmit={async (data) => {
                                if (addBankAccountMutation.isLoading) return;

                                try {
                                  await addBankAccountMutation.mutateAsync({
                                    bankCode: data.bankCode,
                                    accountHolder: data.accountHolder,
                                    accountNumber: data.accountNumber,
                                  });
                                  toast.success('정산 계좌를 추가했습니다.');
                                  refetchBankAccountList();
                                  settlementDialog.close();
                                } catch (error) {
                                  toast.error('잠시 후에 다시 시도하세요.');
                                }
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
                    readOnly={isSettlementStarted(lastSettlementEvent?.settlementEventType)}
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
              <Styled.PageSectionHeader>
                <Styled.PageTitle>정산 내역서</Styled.PageTitle>
                {settlementStatementFile && (
                  <TextButton
                    colorTheme="netural"
                    size="small"
                    icon={<DownloadIcon />}
                    onClick={() => {
                      if (!settlementStatementBlob) return;

                      const downloadUrl = URL.createObjectURL(settlementStatementBlob);

                      const anchorElement = document.createElement('a');
                      anchorElement.href = downloadUrl;
                      anchorElement.download = `불티 정산 내역서 - ${show.name}.pdf`;
                      anchorElement.click();

                      URL.revokeObjectURL(downloadUrl);
                    }}
                  >
                    다운로드
                  </TextButton>
                )}
              </Styled.PageSectionHeader>
              {lastSettlementEvent?.settlementEventType !== null &&
                settlementStatementFile !== null && (
                  <>
                    <Styled.DocumentContainer>
                      <Document
                        file={settlementStatementFile}
                        onLoadSuccess={(data: { numPages: number }) => {
                          setNumPages(data.numPages);
                        }}
                      >
                        {Array.from(new Array(numPages), (_, index) => (
                          <Page key={index} pageNumber={index + 1} width={1070} height={1200} />
                        ))}
                      </Document>
                    </Styled.DocumentContainer>
                    {lastSettlementEvent?.settlementEventType === 'SEND' && (
                      <Styled.DocumentFooter>
                        <AgreeCheck
                          checked={agreeChecked}
                          description="정산 내역 및 안내사항을 모두 확인하였으며 정산을 요청합니다."
                          onChange={(event) => {
                            setAgreeChecked(event.target.checked);
                          }}
                        />
                        <Button
                          colorTheme="primary"
                          size="bold"
                          disabled={!agreeChecked}
                          onClick={async () => {
                            try {
                              await requestSettlementMutation.mutateAsync();

                              toast.success('정산을 요청했습니다');
                            } catch (error) {
                              toast.error('정산 요청에 실패했습니다. 잠시 후에 다시 시도해주세요.');
                            }
                          }}
                        >
                          정산 요청하기
                        </Button>
                      </Styled.DocumentFooter>
                    )}
                  </>
                )}
              {!lastSettlementEvent?.settlementEventType && (
                <Styled.PageDescription>
                  정산 내역서는 티켓 판매종료 후 생성돼요
                </Styled.PageDescription>
              )}
            </Styled.PageSection>
          </>
        )}
      </Styled.ShowSettlementPage>
    </ShowDetailLayout>
  );
};

export default ShowSettlementPage;
