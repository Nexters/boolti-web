import {
  useCreateInvitationTicket,
  useCreateSalesTicket,
  useDeleteInvitationTicket,
  useDeleteSalesTicket,
  useEditSalesTicketInfo,
  useInvitationTicketList,
  useSalesTicketList,
  useShowDetail,
  useShowSalesInfo,
} from '@boolti/api';
import { Button, useConfirm, useToast } from '@boolti/ui';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { myHostInfoAtom } from '~/components/ShowDetailLayout';
import ShowInvitationTicketFormContent from '~/components/ShowInfoFormContent/ShowInvitationTicketFormContent';
import ShowSalesTicketFormContent from '~/components/ShowInfoFormContent/ShowSalesTicketFormContent';
import ShowTicketInfoFormContent from '~/components/ShowInfoFormContent/ShowTicketInfoFormContent';
import { ShowSalesFormInputs } from '~/components/ShowInfoFormContent/types';

import Styled from './ShowTicketPage.styles';
import { useAtom } from 'jotai';
import { HostType } from '@boolti/api/src/types/host';
import ShowDetailUnauthorized from '~/components/ShowDetailUnauthorized';

const ShowTicketPage = () => {
  const params = useParams<{ showId: string }>();
  const [myHostInfo] = useAtom(myHostInfoAtom);

  const showTicketForm = useForm<ShowSalesFormInputs>();

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

  const toast = useToast();
  const confirm = useConfirm();

  const onSubmitShowTicketForm: SubmitHandler<ShowSalesFormInputs> = async (data) => {
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
      startDate: format(showSalesInfo.salesStartTime, 'yyyy-MM-dd'),
      endDate: format(showSalesInfo.salesEndTime, 'yyyy-MM-dd'),
      ticketNotice: showSalesInfo.ticketNotice,
    });
  }, [showSalesInfo, showTicketForm]);

  if (!show || !showSalesInfo) return null;

  return (
    <>
      {myHostInfo?.type === HostType.SUPPORTER ? (
        <ShowDetailUnauthorized
          pageName={'티켓 관리'}
          name={myHostInfo?.hostName as string}
          type={myHostInfo?.type as HostType}
        />
      ) : (
        <Styled.ShowTicketPage>
          <Styled.ShowTicketForm onSubmit={showTicketForm.handleSubmit(onSubmitShowTicketForm)}>
            <Styled.ShowTicketFormContent>
              <ShowTicketInfoFormContent
                form={showTicketForm}
                showDate={format(show.date, 'yyyy-MM-dd')}
                salesStartTime={format(showSalesInfo.salesStartTime, 'yyyy-MM-dd')}
                showCreatedAt={show.createdAt}
                disabled={show.isEnded}
              />
            </Styled.ShowTicketFormContent>
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
          <Styled.ShowTicketFormContent>
            {salesTicketList && (
              <ShowSalesTicketFormContent
                salesTicketList={salesTicketList.map((ticket) => ({
                  id: ticket.id,
                  name: ticket.ticketName,
                  price: ticket.price,
                  quantity: ticket.quantity,
                  totalForSale: ticket.totalForSale,
                }))}
                disabled={show.isEnded}
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
              />
            )}
          </Styled.ShowTicketFormContent>
          <Styled.ShowTicketFormDivider />
          <Styled.ShowTicketFormContent>
            {invitationTicketList && (
              <ShowInvitationTicketFormContent
                invitationTicketList={invitationTicketList.map((ticket) => ({
                  id: ticket.id,
                  name: ticket.ticketName,
                  quantity: ticket.quantity,
                  totalForSale: ticket.totalForSale,
                }))}
                description={
                  <>
                    초청 티켓 이용을 원하시면 티켓을 생성해주세요.
                    <br />* 사용 완료 처리된 코드는 재사용할 수 없습니다.
                  </>
                }
                isShowEnded={show.isEnded}
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
              />
            )}
          </Styled.ShowTicketFormContent>
        </Styled.ShowTicketPage>
      )}
    </>
  );
};

export default ShowTicketPage;
