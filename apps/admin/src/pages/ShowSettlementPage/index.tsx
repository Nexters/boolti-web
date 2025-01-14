import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import {
  ShowSettlementEventResponse,
  useDeleteBankAccountCopyPhoto,
  useDeleteIDCardPhotoFile,
  useReadSettlementBanner,
  useRequestSettlement,
  useSettlementBanners,
  useShowDetail,
  useShowLastSettlementEvent,
  useShowSettlementInfo,
  useShowSettlementStatement,
  useUploadBankAccountCopyPhoto,
  useUploadIDCardPhotoFile,
} from '@boolti/api';
import { DownloadIcon } from '@boolti/icon';
import { AgreeCheck, Button, TextButton, useToast } from '@boolti/ui';
import { format } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useParams } from 'react-router-dom';

import FileInput from '~/components/FileInput/FileInput';
import { myHostInfoAtom } from '~/components/ShowDetailLayout';

import Styled from './ShowSettlementPage.styles';
import { useAtom } from 'jotai';
import ShowDetailUnauthorized, { PAGE_PERMISSION } from '~/components/ShowDetailUnauthorized';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const isSettlementStarted = (eventType?: ShowSettlementEventResponse['settlementEventType']) => {
  return eventType === 'SEND' || eventType === 'REQUEST' || eventType === 'DONE';
};

const ShowSettlementPage = () => {
  const params = useParams<{ showId: string }>();
  const [myHostInfo] = useAtom(myHostInfoAtom);

  const [agreeChecked, setAgreeChecked] = useState<boolean>(false);
  const [numPages, setNumPages] = useState<number>(0);

  const toast = useToast();

  const showId = Number(params!.showId);
  const { data: show } = useShowDetail(showId);
  const { data: settlementInfo, refetch: refetchSettlementInfo } = useShowSettlementInfo(showId);
  const { data: lastSettlementEvent, refetch: refetchLastSettlementEvent } =
    useShowLastSettlementEvent(showId);
  const { data: settlementStatementBlob } = useShowSettlementStatement(showId, {
    enabled: lastSettlementEvent?.settlementEventType != null,
  });
  const { data: settlementBanners } = useSettlementBanners();

  const uploadIDCardPhotoFileMutation = useUploadIDCardPhotoFile(showId);
  const uploadBankAccountCopyPhotoMutation = useUploadBankAccountCopyPhoto(showId);
  const deleteIDCardPhotoFileMutation = useDeleteIDCardPhotoFile(showId);
  const deleteBankAccountCopyPhotoMutation = useDeleteBankAccountCopyPhoto(showId);
  const requestSettlementMutation = useRequestSettlement(showId);
  const readSettlementBanner = useReadSettlementBanner();

  const settlementStatementFile = useMemo(() => {
    if (settlementStatementBlob) {
      return new Blob([settlementStatementBlob], { type: 'application/pdf' });
    }

    return null;
  }, [settlementStatementBlob]);

  useEffect(() => {
    const targetSettlementBanner = settlementBanners?.find(
      (banner) => banner.showId === Number(params.showId),
    );

    if (!targetSettlementBanner) return;

    readSettlementBanner.mutate({
      showId: targetSettlementBanner.showId,
      bannerType: targetSettlementBanner.bannerType,
    });
  }, [params.showId, readSettlementBanner, settlementBanners]);

  if (!show || !myHostInfo) return null;

  if (!PAGE_PERMISSION['정산 관리'].includes(myHostInfo.type)) {
    return (
      <ShowDetailUnauthorized
        pageName={'정산 관리'}
        name={myHostInfo.hostName}
        type={myHostInfo.type}
      />
    );
  }

  return (
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
        업로드 시 불티의 개인정보 처리방침에 동의한 것으로 간주하며, 정보는 정산 및 현금영수증
        발급에 사용됩니다.
        <br />
        정산 프로세스 및 관련 안내는 이{' '}
        <Styled.Link
          href="https://boolti.notion.site/a57e924d8039474985e6bb963a66a869"
          target="_blank"
          rel="noreferrer noopener nofollow"
        >
          링크
        </Styled.Link>
        를 참고해 주세요. 개인정보 처리방침을 확인 후 정산에 필요한 정보를 업로드해 주세요.
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
                      await uploadIDCardPhotoFileMutation.mutateAsync(event.target.files[0]);
                      await refetchSettlementInfo();
                    }
                  }}
                  onClear={async () => {
                    await deleteIDCardPhotoFileMutation.mutateAsync();
                    await refetchSettlementInfo();
                  }}
                />
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
                      await uploadBankAccountCopyPhotoMutation.mutateAsync(event.target.files[0]);
                      await refetchSettlementInfo();
                    }
                  }}
                  onClear={async () => {
                    await deleteBankAccountCopyPhotoMutation.mutateAsync();
                    await refetchSettlementInfo();
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
                            await refetchSettlementInfo();
                            await refetchLastSettlementEvent();

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
                  {lastSettlementEvent?.settlementEventType === 'REQUEST' && (
                    <Styled.DocumentFooter>
                      <Button colorTheme="primary" size="bold" disabled>
                        정산 요청 완료
                      </Button>
                    </Styled.DocumentFooter>
                  )}
                </>
              )}
            {lastSettlementEvent?.settlementEventType === 'DONE' &&
              lastSettlementEvent.triggeredAt && (
                <Styled.SettlementDoneDescription>
                  {format(new Date(lastSettlementEvent.triggeredAt), 'yyyy년 MM월 dd일')}자로 정산이
                  완료된 공연입니다.
                </Styled.SettlementDoneDescription>
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
  );
};

export default ShowSettlementPage;
