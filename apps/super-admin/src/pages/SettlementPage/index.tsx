import {
  useAdminCreateSettlementStatement,
  useAdminSettlementDone,
  useAdminSettlementEvent,
  useAdminSettlementInfo,
  useAdminShowDetail,
  useAdminTicketSalesInfo,
  useSuperAdminShowSettlementStatement,
} from '@boolti/api';
import { PlusIcon } from '@boolti/icon';
import { Button, useConfirm, useDialog, useToast } from '@boolti/ui';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';

import SettlementStatementFormDialog from '~/components/SettlementStatement/SettlementStatementFormDialog';

import Styled from './SettlementPage.styles';
import PageLayout from '~/components/PageLayout/PageLayout';
import { BOOLTI_FEE_RATE } from '~/constants/settlement';

const SettlementPage = () => {
  const params = useParams<{ showId: string }>();

  const dialog = useDialog();
  const toast = useToast();
  const settlementCompleteConfirm = useConfirm();

  const { data: adminShowDetail } = useAdminShowDetail(Number(params!.showId));
  const { data: adminSettlementEvent, refetch: refetchAdminSettlementEvent } =
    useAdminSettlementEvent(Number(params!.showId));
  const { data: adminSettlementInfo } = useAdminSettlementInfo(Number(params!.showId));
  const { data: adminTicketSalesInfo } = useAdminTicketSalesInfo(Number(params!.showId));
  const { data: superAdminShowSettlementStatementBlob } = useSuperAdminShowSettlementStatement(Number(params!.showId), {
    enabled: !!adminSettlementEvent && adminSettlementEvent?.SEND !== null
  });
  const createSettlementStatementMutation = useAdminCreateSettlementStatement();
  const settlementDoneMutation = useAdminSettlementDone();

  const dialogContent = (
    <SettlementStatementFormDialog
      ticketSalesInfo={adminTicketSalesInfo ?? []}
      initialValues={{
        showName: adminShowDetail?.name ?? '',
        hostName: adminShowDetail?.host.name ?? '',
        accountHolder: adminSettlementInfo?.bankAccount?.bankAccountHolder ?? '',
        bankCode: adminSettlementInfo?.bankAccount?.bankCode ?? '',
        accountNumber: adminSettlementInfo?.bankAccount?.bankAccountNumber ?? '',
      }}
      onSubmit={async (data) => {
        try {
          if (createSettlementStatementMutation.isLoading) return;

          const body = {
            showName: data.showName,
            hostName: data.hostName,
            settlementBankInfo: {
              bankCode: data.bankCode,
              bankAccountNumber: data.accountNumber,
              bankAccountHolder: data.accountHolder,
            },
            businessLicenseNumber: data.businessNumber,
            salesAmount: parseInt(data.salesAmount.replace(/,/g, '')),
            salesItems: data.salesItems.reduce<
              {
                salesTicketTypeId: number;
                amount: number;
              }[]
            >((acc, item) => {
              acc.push({
                salesTicketTypeId: parseInt(item.salesTicketId.replace(/,/g, '')),
                amount: parseInt(item.amount.replace(/,/g, '')),
              });

              return acc;
            }, []),
            fee: parseInt(data.fee.replace(/,/g, '')),
            feeItems: [
              {
                feeType: 'BROKERAGE_FEE' as 'BROKERAGE_FEE' | 'PAYMENT_AGENCY_FEE',
                amount: parseInt(data.brokerageFee.replace(/,/g, '')),
              },
              {
                feeType: 'PAYMENT_AGENCY_FEE' as
                  | 'BROKERAGE_FEE'
                  | 'PAYMENT_AGENCY_FEE',
                amount: parseInt(data.paymentAgencyFee.replace(/,/g, '')),
              },
            ],
            vat: parseInt(data.vat.replace(/,/g, '')),
            roundAmount: parseInt(data.adjustmentAmount.replace(/,/g, '')),
            roundReason: data.adjustmentReason,
          };

          await createSettlementStatementMutation.mutateAsync({
            showId: Number(params.showId),
            body,
          });
          await refetchAdminSettlementEvent();

          toast.success('정산 내역서를 발송했어요.');
          dialog.close();
        } catch (error) {
          console.error(error);
          toast.error('정산 내역서를 생성하지 못했어요. 개발자에게 문의해주세요.');
        }
      }}
    />
  )

  return (
    <PageLayout
      breadscrumb="정산 관리 / 정산 내역서"
      title="정산 내역서"
      description={`공연 종료 후 수익이 있을 때만 생성하는 내역서 입니다.\n신분증과 정산 계좌 정보, 통장 사본을 꼼꼼히 확인한 후 발송을 진행해 주세요.`}
    >
      {adminSettlementEvent &&
        (adminSettlementEvent?.SEND !== null !== null ||
          adminSettlementEvent?.REQUEST !== null ||
          adminSettlementEvent?.DONE !== null) && (
          <>
            <Styled.Section>
              <Styled.SectionTitle>정산 진행 현황</Styled.SectionTitle>
              <Styled.Progress>
                <Styled.ProgressItem active={!!adminSettlementEvent?.SEND}>
                  <Styled.ProgressItemNumber active={!!adminSettlementEvent?.SEND}>
                    1
                  </Styled.ProgressItemNumber>
                  <Styled.ProgressItemTitle active={!!adminSettlementEvent?.SEND}>
                    내역서 발송
                  </Styled.ProgressItemTitle>
                  {adminSettlementEvent?.SEND && (
                    <Styled.ProgressItemDescription>
                      {format(adminSettlementEvent.SEND, 'yyyy-MM-dd HH:mm')}
                    </Styled.ProgressItemDescription>
                  )}
                  {adminSettlementEvent?.SEND && superAdminShowSettlementStatementBlob && (
                    <Styled.ProgressItemButton onClick={() => {
                      if (!adminShowDetail) return;

                      const downloadUrl = URL.createObjectURL(superAdminShowSettlementStatementBlob);

                      const anchorElement = document.createElement('a');
                      anchorElement.href = downloadUrl;
                      anchorElement.download = `불티 정산 내역서 - ${adminShowDetail.name}.pdf`;
                      anchorElement.click();

                      URL.revokeObjectURL(downloadUrl);
                    }}>
                      전송한 내역서 보기
                    </Styled.ProgressItemButton>
                  )}
                </Styled.ProgressItem>
                <Styled.ProgressItem active={!!adminSettlementEvent?.REQUEST}>
                  <Styled.ProgressItemNumber active={!!adminSettlementEvent?.REQUEST}>
                    2
                  </Styled.ProgressItemNumber>
                  <Styled.ProgressItemTitle active={!!adminSettlementEvent?.REQUEST}>
                    주최자 확인 및 정산 요청
                  </Styled.ProgressItemTitle>
                  {adminSettlementEvent?.REQUEST && (
                    <Styled.ProgressItemDescription>
                      {format(adminSettlementEvent.REQUEST, 'yyyy-MM-dd HH:mm')}
                    </Styled.ProgressItemDescription>
                  )}
                </Styled.ProgressItem>
                <Styled.ProgressItem active={!!adminSettlementEvent?.DONE}>
                  <Styled.ProgressItemNumber active={!!adminSettlementEvent?.DONE}>
                    3
                  </Styled.ProgressItemNumber>
                  <Styled.ProgressItemTitle active={!!adminSettlementEvent?.DONE}>
                    {adminSettlementEvent?.SEND &&
                      adminSettlementEvent?.REQUEST &&
                      !adminSettlementEvent?.DONE ? (
                      <Button
                        colorTheme="netural"
                        size="x-small"
                        onClick={async () => {
                          const confirm = await settlementCompleteConfirm(
                            <Styled.ConfirmContent>
                              <Styled.ConfirmParagraph bold>
                                정산 완료 처리 전 다시 한 번 확인해 주세요!
                              </Styled.ConfirmParagraph>
                              <Styled.ConfirmParagraph>
                                사용자가 입력한 정산 계좌에 정확한 정산액을 이체해야 합니다.
                              </Styled.ConfirmParagraph>
                            </Styled.ConfirmContent>,
                            {
                              cancel: '돌아가기',
                              confirm: '정산 완료 처리하기',
                            },
                            {
                              confirmButtonColorTheme: 'neutral',
                            },
                          );

                          if (confirm) {
                            try {
                              await settlementDoneMutation.mutateAsync(Number(params.showId));
                            } catch (error) {
                              console.error(error);
                              toast.error('정산 완료 처리에 실패했습니다. 다시 시도해주세요.');
                            }

                            refetchAdminSettlementEvent();
                          }
                        }}
                      >
                        정산 완료
                      </Button>
                    ) : (
                      '정산 완료'
                    )}
                  </Styled.ProgressItemTitle>
                  {adminSettlementEvent?.DONE && (
                    <Styled.ProgressItemDescription>
                      {format(adminSettlementEvent.DONE, 'yyyy-MM-dd HH:mm')}
                    </Styled.ProgressItemDescription>
                  )}
                </Styled.ProgressItem>
              </Styled.Progress>
            </Styled.Section>
            <Styled.SectionDivider />
          </>
        )}
      <Styled.Section>
        <Styled.SectionTitle>사용자 입력 정보</Styled.SectionTitle>
        <Styled.UserInfo>
          <Styled.UserInfoItem>
            <Styled.UserInfoTitle>신분증 또는 사업자등록증 사본</Styled.UserInfoTitle>
            <Styled.UserInfoContent>
              {adminSettlementInfo?.idCardPhotoFile ? (
                <Styled.UserInfoLink href={adminSettlementInfo?.idCardPhotoFile?.url}>
                  {adminSettlementInfo.idCardPhotoFile.fileName}
                </Styled.UserInfoLink>
              ) : (
                <Styled.UserInfoText>-</Styled.UserInfoText>
              )}
            </Styled.UserInfoContent>
          </Styled.UserInfoItem>
          <Styled.UserInfoItem>
            <Styled.UserInfoTitle>통장 사본</Styled.UserInfoTitle>
            <Styled.UserInfoContent>
              {adminSettlementInfo?.settlementBankAccountPhotoFile ? (
                <Styled.UserInfoLink href={adminSettlementInfo.settlementBankAccountPhotoFile.url}>
                  {adminSettlementInfo.settlementBankAccountPhotoFile.fileName}
                </Styled.UserInfoLink>
              ) : (
                <Styled.UserInfoText>-</Styled.UserInfoText>
              )}
            </Styled.UserInfoContent>
          </Styled.UserInfoItem>
        </Styled.UserInfo>
      </Styled.Section>
      <Styled.SectionDivider />
      <Styled.Section>
        <Styled.SectionTitle>티켓 판매 정보</Styled.SectionTitle>
        <Styled.Table>
          <Styled.TableHead>
            <Styled.TableHeader>
              <Styled.TableHeaderItem>티켓 종류</Styled.TableHeaderItem>
              <Styled.TableHeaderItem minWidth={180}>티켓명</Styled.TableHeaderItem>
              <Styled.TableHeaderItem align="right">매당 판매액</Styled.TableHeaderItem>
              <Styled.TableHeaderItem align="right">판매 매수</Styled.TableHeaderItem>
              <Styled.TableHeaderItem align="right">총 판매액</Styled.TableHeaderItem>
              <Styled.TableHeaderItem></Styled.TableHeaderItem>
            </Styled.TableHeader>
          </Styled.TableHead>
          <Styled.TableBody>
            {adminTicketSalesInfo?.map((ticket) => {
              const ticketTypeText = (() => {
                if (ticket.ticketType === 'SALE') return '일반 티켓';
                if (ticket.ticketType === 'INVITE') return '초청 티켓';

                return null;
              })();

              return (
                <Styled.TableRow key={ticket.salesTicketId}>
                  <Styled.TableItem>{ticketTypeText}</Styled.TableItem>
                  <Styled.TableItem minWidth={180}>{ticket.ticketName}</Styled.TableItem>
                  <Styled.TableItem align="right">
                    {ticket.price.toLocaleString()}원
                  </Styled.TableItem>
                  <Styled.TableItem align="right">
                    {ticket.salesCount.toLocaleString()}매
                  </Styled.TableItem>
                  <Styled.TableItem align="right">
                    {ticket.amount.toLocaleString()}원
                  </Styled.TableItem>
                  <Styled.TableItem></Styled.TableItem>
                </Styled.TableRow>
              );
            })}
            <Styled.TableRow>
              <Styled.TableItem>총 판매</Styled.TableItem>
              <Styled.TableItem></Styled.TableItem>
              <Styled.TableItem></Styled.TableItem>
              <Styled.TableItem align="right">
                {adminTicketSalesInfo
                  ?.reduce<number>((acc, cur) => acc + cur.salesCount, 0)
                  .toLocaleString()}
                매
              </Styled.TableItem>
              <Styled.TableItem align="right">
                {adminTicketSalesInfo
                  ?.reduce<number>((acc, cur) => acc + cur.amount, 0)
                  .toLocaleString()}
                원
              </Styled.TableItem>
              <Styled.TableItem></Styled.TableItem>
            </Styled.TableRow>
            <Styled.TableRow>
              <Styled.TableItem>불티 수수료</Styled.TableItem>
              <Styled.TableItem></Styled.TableItem>
              <Styled.TableItem></Styled.TableItem>
              <Styled.TableItem></Styled.TableItem>
              <Styled.TableItem align="right">
                {((adminTicketSalesInfo ?? []).reduce<number>((acc, cur) => acc + cur.amount, 0) * BOOLTI_FEE_RATE)
                  .toLocaleString()}
                원
              </Styled.TableItem>
              <Styled.TableItem></Styled.TableItem>
            </Styled.TableRow>
          </Styled.TableBody>
        </Styled.Table>
      </Styled.Section>
      {!adminSettlementEvent?.SEND &&
        !adminSettlementEvent?.REQUEST &&
        !adminSettlementEvent?.DONE && (
          <Styled.Section>
            <Button
              type="button"
              size="bold"
              colorTheme="netural"
              onClick={() => {
                dialog.open({
                  title: '정산 내역서 생성하기',
                  content: dialogContent,
                  isAuto: true,
                });
              }}
            >
              <PlusIcon />
              내역서 생성하기
            </Button>
          </Styled.Section>
        )}
      {adminSettlementEvent?.SEND &&
        !adminSettlementEvent?.REQUEST &&
        !adminSettlementEvent?.DONE && (
          <Styled.Section>
            <Button
              type="button"
              size="bold"
              colorTheme="line"
              onClick={() => {
                dialog.open({
                  title: '정산 내역서 생성하기',
                  content: dialogContent,
                  isAuto: true,
                });
              }}>
              <PlusIcon />
              내역서 재생성하기
            </Button>
          </Styled.Section>
        )}
    </PageLayout>
  );
};

export default SettlementPage;
