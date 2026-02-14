import {
  useCreateInvitationTicket,
  useCreateSalesTicket,
  useDeleteInvitationTicket,
  useDeleteSalesTicket,
  useEditSalesTicketInfo,
  useEditSalesTicketType,
  useInvitationTicketList,
  useSalesTicketList,
  useShowDetail,
  useShowSalesInfo,
} from '@boolti/api';
import { Button, useConfirm, useDialog, useToast } from '@boolti/ui';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { myHostInfoAtom } from '~/components/ShowDetailLayout';
import ShowInvitationTicketFormContent from '~/components/ShowInfoFormContent/ShowInvitationTicketFormContent';
import ShowSalesTicketFormContent from '~/components/ShowInfoFormContent/ShowSalesTicketFormContent';
import ShowTicketInfoFormContent from '~/components/ShowInfoFormContent/ShowTicketInfoFormContent';
import { ShowSalesInfoFormInputs } from '~/components/ShowInfoFormContent/types';
import TicketSettingForm from '~/components/TicketForm/TicketSettingForm';

import Styled from './ShowTicketPage.styles';
import { useAtom } from 'jotai';
import ShowDetailUnauthorized, { PAGE_PERMISSION } from '~/components/ShowDetailUnauthorized';
import { ShareBanner } from '~/components/ShareBanner';

const ShowTicketPage = () => {
  const params = useParams<{ showId: string }>();
  const [myHostInfo] = useAtom(myHostInfoAtom);

  const showTicketForm = useForm<ShowSalesInfoFormInputs>();

  const showId = Number(params!.showId);
  const { data: show } = useShowDetail(showId);
  const { data: showSalesInfo, refetch: refetchSalesTicketInfo } = useShowSalesInfo(showId);
  const { data: salesTicketList, refetch: refetchSalesTicketList } = useSalesTicketList(showId);
  const { data: invitationTicketList, refetch: refetchInvitationTicketList } =
    useInvitationTicketList(showId);
  const editSalesTicketInfoMutation = useEditSalesTicketInfo();
  const createSalesTicketMutation = useCreateSalesTicket();
  const createInvitationTicketMutation = useCreateInvitationTicket();
  const deleteSalesTicketMutation = useDeleteSalesTicket();
  const deleteInvitationTicketMutation = useDeleteInvitationTicket();
  const editSalesTicketTypeMutation = useEditSalesTicketType();

  const toast = useToast();
  const confirm = useConfirm();
  const salesTicketSettingDialog = useDialog();
  const invitationTicketSettingDialog = useDialog();

  const onSubmitShowTicketForm: SubmitHandler<ShowSalesInfoFormInputs> = async (data) => {
    if (!show) return;

    await editSalesTicketInfoMutation.mutateAsync({
      showId: show.id,
      salesStartTime: `${data.startDate}T00:00:00.000Z`,
      salesEndTime: `${data.endDate}T23:59:59.000Z`,
      ticketNotice: `${data.ticketNotice}`,
    });
    await refetchSalesTicketInfo();

    toast.success('티켓 판매 정보를 저장했습니다.');
  };

  useEffect(() => {
    if (!showSalesInfo) return;

    showTicketForm.reset({
      startDate: showSalesInfo.salesStartTime
        ? format(showSalesInfo.salesStartTime, 'yyyy-MM-dd')
        : '',
      endDate: showSalesInfo.salesEndTime ? format(showSalesInfo.salesEndTime, 'yyyy-MM-dd') : '',
      ticketNotice: showSalesInfo.ticketNotice,
    });
  }, [showSalesInfo, showTicketForm]);

  if (!show || !showSalesInfo || !myHostInfo) return null;

  if (!PAGE_PERMISSION['판매 정보'].includes(myHostInfo.type)) {
    return (
      <ShowDetailUnauthorized
        pageName={'판매 정보'}
        name={myHostInfo.hostName}
        type={myHostInfo.type}
      />
    );
  }

  return (
    <Styled.ShowTicketPage>
      <Styled.ShowTicketForm onSubmit={showTicketForm.handleSubmit(onSubmitShowTicketForm)}>
        <Styled.ShowTicketFormContentContainer>
          <ShowTicketInfoFormContent
            form={showTicketForm}
            showDate={format(show.date, 'yyyy-MM-dd')}
            salesStartTime={
              showSalesInfo.salesStartTime ? format(showSalesInfo.salesStartTime, 'yyyy-MM-dd') : ''
            }
            showCreatedAt={show.createdAt}
            disabled={show.isEnded}
          />
        </Styled.ShowTicketFormContentContainer>
        <Styled.ShowTicketSubmitContainer>
          <Button
            type="submit"
            colorTheme="primary"
            size="bold"
            disabled={!showTicketForm.formState.isValid || show.isEnded}
          >
            저장하기
          </Button>
        </Styled.ShowTicketSubmitContainer>
      </Styled.ShowTicketForm>
      <Styled.ShowTicketFormDivider />
      <Styled.ShowTicketFormContentContainer>
        <Styled.ShowTicketFormTitle>판매 티켓</Styled.ShowTicketFormTitle>
        <Styled.ShowTicketFormContent>
          {salesTicketList && (
            <ShowSalesTicketFormContent
              salesTicketList={salesTicketList.map((ticket) => ({
                id: ticket.id,
                name: ticket.ticketName,
                price: ticket.price,
                quantity: ticket.quantity,
                totalForSale: ticket.totalForSale,
                isPaused: ticket.isPaused,
              }))}
              disabled={show.isEnded}
              actionType="setting"
              onSubmitTicket={async (ticket) => {
                await createSalesTicketMutation.mutateAsync({
                  showId: show.id,
                  ticketName: ticket.name,
                  price: Number(ticket.price),
                  totalForSale: Number(ticket.totalForSale),
                });

                await refetchSalesTicketList();
                toast.success('일반 티켓을 생성했습니다.');
              }}
              onDeleteTicket={async (ticket) => {
                if (ticket.id === undefined) return;

                const result = await confirm(
                  '삭제한 티켓은 다시 생성할 수 없어요. 삭제하시겠어요?',
                  {
                    cancel: '취소하기',
                    confirm: '삭제하기',
                  },
                );

                if (!result) return;

                await deleteSalesTicketMutation.mutateAsync(ticket.id);
                await refetchSalesTicketList();
                toast.success('티켓을 삭제했습니다.');
              }}
              onSettingClick={(ticket) => {
                const isSingleTicket = salesTicketList.length === 1;
                const originalTicket = salesTicketList.find((t) => t.id === ticket.id);
                const soldAtLeastOnce = originalTicket?.soldAtLeastOnce ?? false;

                salesTicketSettingDialog.open({
                  title: '일반 티켓 설정',
                  content: (
                    <TicketSettingForm
                      ticketType="sales"
                      defaultValues={{
                        name: ticket.name,
                        price: ticket.price,
                        totalForSale: ticket.totalForSale,
                        quantity: ticket.quantity,
                        isPaused: ticket.isPaused,
                      }}
                      soldAtLeastOnce={soldAtLeastOnce}
                      isDeleteDisabled={isSingleTicket || soldAtLeastOnce}
                      onSubmit={async (data) => {
                        if (ticket.id === undefined) return;

                        await editSalesTicketTypeMutation.mutateAsync({
                          salesTicketTypeId: ticket.id,
                          ticketName: data.name,
                          price: data.price ? Number(data.price) : undefined,
                          totalForSale: Number(data.totalForSale),
                          isPaused: data.isPaused,
                        });
                        salesTicketSettingDialog.close();
                        await refetchSalesTicketList();
                        toast.success('티켓 정보를 저장했습니다.');
                      }}
                      onDelete={async () => {
                        if (ticket.id === undefined) return;

                        const result = await confirm(
                          '삭제한 티켓은 다시 생성할 수 없어요. 삭제하시겠어요?',
                          {
                            cancel: '취소하기',
                            confirm: '삭제하기',
                          },
                        );

                        if (!result) return;

                        await deleteSalesTicketMutation.mutateAsync(ticket.id);
                        salesTicketSettingDialog.close();
                        await refetchSalesTicketList();
                        toast.success('티켓을 삭제했습니다.');
                      }}
                    />
                  ),
                });
              }}
            />
          )}
          {invitationTicketList && (
            <ShowInvitationTicketFormContent
              invitationTicketList={invitationTicketList.map((ticket) => ({
                id: ticket.id,
                name: ticket.ticketName,
                quantity: ticket.quantity,
                totalForSale: ticket.totalForSale,
                isPaused: ticket.isPaused,
              }))}
              description={
                <>
                  초청 티켓 이용을 원하시면 티켓을 생성해주세요.
                  <br />* 사용 완료 처리된 코드는 재사용할 수 없습니다.
                </>
              }
              isShowEnded={show.isEnded}
              actionType="setting"
              onSubmitTicket={async (ticket) => {
                await createInvitationTicketMutation.mutateAsync({
                  showId: show.id,
                  ticketName: ticket.name,
                  totalForSale: Number(ticket.totalForSale),
                });
                await refetchInvitationTicketList();
                toast.success('초청 티켓을 생성했습니다.');
              }}
              onDeleteTicket={async (ticket) => {
                if (ticket.id === undefined) return;

                const result = await confirm(
                  '삭제한 티켓은 다시 생성할 수 없어요. 삭제하시겠어요?',
                  {
                    cancel: '취소하기',
                    confirm: '삭제하기',
                  },
                );

                if (!result) return;

                await deleteInvitationTicketMutation.mutateAsync(ticket.id);
                await refetchInvitationTicketList();
                toast.success('티켓을 삭제했습니다.');
              }}
              onSettingClick={(ticket) => {
                const isSoldTicket = ticket.totalForSale > ticket.quantity;

                invitationTicketSettingDialog.open({
                  title: '초청 티켓 설정',
                  content: (
                    <TicketSettingForm
                      ticketType="invitation"
                      defaultValues={{
                        name: ticket.name,
                        totalForSale: ticket.totalForSale,
                        quantity: ticket.quantity,
                        isPaused: ticket.isPaused,
                      }}
                      soldAtLeastOnce={isSoldTicket}
                      isDeleteDisabled={isSoldTicket}
                      onSubmit={async (data) => {
                        if (ticket.id === undefined) return;

                        await editSalesTicketTypeMutation.mutateAsync({
                          salesTicketTypeId: ticket.id,
                          ticketName: data.name,
                          totalForSale: Number(data.totalForSale),
                          isPaused: data.isPaused,
                        });
                        invitationTicketSettingDialog.close();
                        await refetchInvitationTicketList();
                        toast.success('티켓 정보를 저장했습니다.');
                      }}
                      onDelete={async () => {
                        if (ticket.id === undefined) return;

                        const result = await confirm(
                          '삭제한 티켓은 다시 생성할 수 없어요. 삭제하시겠어요?',
                          {
                            cancel: '취소하기',
                            confirm: '삭제하기',
                          },
                        );

                        if (!result) return;

                        await deleteInvitationTicketMutation.mutateAsync(ticket.id);
                        invitationTicketSettingDialog.close();
                        await refetchInvitationTicketList();
                        toast.success('티켓을 삭제했습니다.');
                      }}
                    />
                  ),
                });
              }}
            />
          )}
        </Styled.ShowTicketFormContent>
      </Styled.ShowTicketFormContentContainer>
      <ShareBanner text="PC에서 공연을 편하게 관리해 보세요" />
    </Styled.ShowTicketPage>
  );
};

export default ShowTicketPage;
