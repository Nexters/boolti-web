import {
  useSuperAdminCreateInvitationTicket,
  useSuperAdminCreateSalesTicket,
  useSuperAdminDeleteInvitationTicket,
  useSuperAdminDeleteSalesTicket,
  useSuperAdminEditSalesInfo,
  useSuperAdminInvitationTicketList,
  useSuperAdminSalesTicketList,
  useSuperAdminTicketSalesInfo,
} from '@boolti/api';
import { useParams } from 'react-router-dom';
import PageLayout from '~/components/PageLayout/PageLayout';
import Styled from './TicketPage.styles';
import { Button, useConfirm, useDialog, useToast } from '@boolti/ui';
import { Plus } from '@boolti/icon/src/components/Plus';
import InvitationCodeList from './InvitationCodeList';
import SalesTicketForm from '~/components/SalesTicketForm/SalesTicketForm';
import InvitationTicketForm from '~/components/InvitationTicketForm/InvitationTicketForm';
import BaseBadge from '~/components/BaseBadge/BaseBadge';
import { useTheme } from '@emotion/react';
import { Form, Input, DatePicker } from 'antd';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';
import { useEffect } from 'react';

const MyDatePicker = DatePicker.generatePicker<Date>(dateFnsGenerateConfig);
const { RangePicker } = MyDatePicker;

const TicketPage = () => {
  const params = useParams<{ showId: string }>();
  const showId = Number(params!.showId);

  const { data: salesInfoData, refetch: refetchSalesInfo } = useSuperAdminTicketSalesInfo(showId);
  const { data: salesTickets, refetch: refetchSalesTicketList } =
    useSuperAdminSalesTicketList(showId);
  const { data: invitationTickets, refetch: refetchInvitationTicketList } =
    useSuperAdminInvitationTicketList(showId);

  const theme = useTheme();
  const dialog = useDialog();
  const confirm = useConfirm();
  const toast = useToast();
  const [form] = Form.useForm();
  const deleteSalesTicket = useSuperAdminDeleteSalesTicket();
  const deleteInvitationTicket = useSuperAdminDeleteInvitationTicket();
  const createSalesTicket = useSuperAdminCreateSalesTicket();
  const createInvitationTicket = useSuperAdminCreateInvitationTicket();
  const editSalesInfo = useSuperAdminEditSalesInfo();

  const handleSaveSalesInfo = async (values: {
    salesRange: [Date, Date];
    ticketNotice: string;
  }) => {
    try {
      const { salesRange, ticketNotice } = values;
      const salesStartTime = salesRange[0];
      const salesEndTime = salesRange[1];
      salesEndTime.setHours(23);
      salesEndTime.setMinutes(59);
      salesEndTime.setSeconds(59);
      await editSalesInfo.mutateAsync({
        showId,
        salesStartTime: salesStartTime.toISOString(),
        salesEndTime: salesEndTime.toISOString(),
        ticketNotice,
      });
      await refetchSalesInfo();
      toast.success('티켓 판매 정보를 수정했습니다.');
    } catch (error) {
      toast.error('티켓 판매 정보 수정 중에 문제가 발생했습니다.');
    }
  };

  const handleCreateSalesTicket = async (values: {
    ticketName: string;
    price: number;
    quantity: number;
  }) => {
    try {
      const { ticketName, price, quantity } = values;
      await createSalesTicket.mutateAsync({
        showId,
        ticketName,
        price: +price,
        totalForSale: +quantity,
      });
      dialog.close();
      toast.success('일반 티켓을 생성했습니다.');
      await refetchSalesTicketList();
    } catch (error) {
      toast.error('티켓 생성 중 문제가 발생했습니다.');
    }
  };

  const handleCreateInvitationTicket = async (values: { ticketName: string; quantity: number }) => {
    try {
      const { ticketName, quantity } = values;
      await createInvitationTicket.mutateAsync({
        showId,
        ticketName,
        totalForSale: +quantity,
      });
      dialog.close();
      toast.success('초청 티켓을 생성했습니다.');
      await refetchInvitationTicketList();
    } catch (error) {
      toast.error('티켓 생성 중 문제가 발생했습니다.');
    }
  };

  const handleDeleteTicket = async (ticketId: number, isSalesTicket: boolean) => {
    const result = await confirm('삭제한 티켓은 다시 생성할 수 없어요. 삭제하시겠어요?', {
      cancel: '취소하기',
      confirm: '삭제하기',
    });

    if (!result) {
      return;
    }
    deleteTicket(ticketId, isSalesTicket);
  };

  const deleteTicket = async (ticketId: number, isSalesTicket: boolean) => {
    try {
      if (isSalesTicket) {
        await deleteSalesTicket.mutateAsync(ticketId);
        await refetchSalesTicketList();
      } else {
        await deleteInvitationTicket.mutateAsync(ticketId);
        await refetchInvitationTicketList();
      }
      toast.success('티켓을 삭제했습니다.');
    } catch (error) {
      toast.error('티켓 삭제 중 문제가 발생했습니다.');
    }
  };

  // TODO: 품절처리 추가
  // const handleSoldoutTicket = (ticketId: number) => {};

  useEffect(() => {
    form.setFieldsValue({
      salesRange: [
        new Date(salesInfoData?.salesStartTime as string),
        new Date(salesInfoData?.salesEndTime as string),
      ],
      ticketNotice: salesInfoData?.ticketNotice,
    });
  }, [form, salesInfoData]);

  return (
    <PageLayout
      breadscrumb="공연 정보 관리 / 티켓 관리"
      title="티켓 관리"
      description={`수정 시 웹 / 앱에 실시간으로 적용됩니다. 주최자가 직접 정보를 컨트롤 할 수 없는\n'티켓 판매 중, 공연 종료 이후'에 요청이 있는 경우에만 활용해 주세요.`}
    >
      <Styled.Container>
        <Styled.Section>
          <Styled.Wrapper>
            <Styled.Title>티켓 판매 정보</Styled.Title>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSaveSalesInfo}
              style={{ marginTop: 16 }}
            >
              <Form.Item name="salesRange" label="판매 시작일/종료일" rules={[{ required: true }]}>
                <RangePicker format="YYYY/MM/DD" style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item label="티켓 구매 시 안내사항">
                <Styled.Description>
                  예매자에게 안내할 사항이 있다면 작성해 주세요. 작성한 내용은 티켓 상세 화면에
                  노출됩니다.
                </Styled.Description>
                <Form.Item name="ticketNotice">
                  <Input.TextArea
                    style={{ height: 240, padding: 12, marginTop: 16, resize: 'none' }}
                  />
                </Form.Item>
              </Form.Item>
              <Button colorTheme="netural" size="medium" type="submit">
                저장하기
              </Button>
            </Form>
          </Styled.Wrapper>
        </Styled.Section>
        <Styled.Section>
          <Styled.Wrapper>
            <Styled.SectionHeader>
              <div>
                <Styled.Title>일반 티켓</Styled.Title>
                <Styled.Description>
                  티켓 판매를 위해서는 최소 1개 이상의 티켓이 필요해요.
                  <br />* 1매 이상 판매된 티켓은 삭제할 수 없습니다.
                </Styled.Description>
              </div>
              <Button
                colorTheme="netural"
                size="medium"
                onClick={() => {
                  dialog.open({
                    title: '일반 티켓 생성하기',
                    content: <SalesTicketForm onCreate={handleCreateSalesTicket} />,
                  });
                }}
              >
                <Plus />
                &nbsp; 생성하기
              </Button>
            </Styled.SectionHeader>
            {salesTickets?.map((ticket) => (
              <Styled.Ticket key={ticket.id}>
                <Styled.TicketContentsWrapper>
                  <Styled.TicketInfo>
                    <div>
                      <h3>{ticket.ticketName}</h3>
                      <BaseBadge
                        color={theme.palette.primary.o1}
                        label={`재고 ${ticket.quantity}/${ticket.totalForSale}`}
                        backgroundColor={theme.palette.primary.o0}
                      />
                    </div>
                    <span>{ticket.price.toLocaleString()}원</span>
                  </Styled.TicketInfo>
                  <Styled.TicketButtonGroup>
                    <Button
                      colorTheme="primary"
                      size="medium"
                      // TODO: 품절처리 추가
                      // onClick={() => handleSoldoutTicket(ticket.id)}
                    >
                      품절처리
                    </Button>
                    <Button
                      colorTheme="line"
                      size="medium"
                      onClick={() => handleDeleteTicket(ticket.id, true)}
                    >
                      삭제하기
                    </Button>
                  </Styled.TicketButtonGroup>
                </Styled.TicketContentsWrapper>
              </Styled.Ticket>
            ))}
          </Styled.Wrapper>
        </Styled.Section>
        <Styled.Section>
          <Styled.Wrapper>
            <Styled.SectionHeader>
              <div>
                <Styled.Title>초청 티켓</Styled.Title>
                <Styled.Description>
                  초청 티켓 이용을 원하시면 티켓을 생성해주세요.
                  <br />* 미사용 처리한 코드는 재사용할 수 있습니다.
                </Styled.Description>
              </div>
              <Button
                colorTheme="netural"
                size="medium"
                onClick={() => {
                  dialog.open({
                    title: '초청 티켓 생성하기',
                    content: <InvitationTicketForm onCreate={handleCreateInvitationTicket} />,
                  });
                }}
              >
                <Plus />
                &nbsp; 생성하기
              </Button>
            </Styled.SectionHeader>
            {invitationTickets?.map((ticket) => (
              <Styled.Ticket key={ticket.id}>
                <Styled.TicketContentsWrapper>
                  <Styled.TicketInfo>
                    <div>
                      <h3>{ticket.ticketName}</h3>
                      <BaseBadge
                        color={theme.palette.primary.o1}
                        label={`재고 ${ticket.quantity}/${ticket.totalForSale}`}
                        backgroundColor={theme.palette.primary.o0}
                      />
                    </div>
                    <span>1인 1매</span>
                  </Styled.TicketInfo>
                  <Styled.TicketButtonGroup>
                    <Button colorTheme="primary" size="medium">
                      품절처리
                    </Button>
                    <Button
                      colorTheme="line"
                      size="medium"
                      onClick={() => handleDeleteTicket(ticket.id, false)}
                    >
                      삭제하기
                    </Button>
                  </Styled.TicketButtonGroup>
                </Styled.TicketContentsWrapper>
                <InvitationCodeList ticketId={ticket.id} />
              </Styled.Ticket>
            ))}
          </Styled.Wrapper>
        </Styled.Section>
      </Styled.Container>
    </PageLayout>
  );
};

export default TicketPage;
