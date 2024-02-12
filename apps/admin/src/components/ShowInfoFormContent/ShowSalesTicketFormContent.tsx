import { PlusIcon } from '@boolti/icon';
import { Badge, Button, useDialog } from '@boolti/ui';
import { SubmitHandler } from 'react-hook-form';

import SalesTicketForm, { SalesTicketFormInputs } from '../TicketForm/SalesTicketForm';
import Styled from './ShowInfoFormContent.styles';

interface ShowSalesTicketFormContentProps {
  salesTicketList: SalesTicketFormInputs[];
  onSubmitTicket: SubmitHandler<SalesTicketFormInputs>;
  onDeleteTicket: (ticket: SalesTicketFormInputs) => void;
}

const ShowSalesTicketFormContent = ({
  salesTicketList,
  onSubmitTicket,
  onDeleteTicket,
}: ShowSalesTicketFormContentProps) => {
  const salesTicketDialog = useDialog();

  const handleSubmitTicket: SubmitHandler<SalesTicketFormInputs> = (data) => {
    salesTicketDialog.close();

    onSubmitTicket(data);
  };

  return (
    <Styled.TicketGroup>
      <Styled.TicketGroupHeader>
        <Styled.TicketGroupInfo>
          <Styled.TicketGroupTitle required>일반 티켓</Styled.TicketGroupTitle>
          <Styled.TicketGroupDescription>
            티켓 판매를 위해서는 최소 1개 이상의 티켓이 필요해요.
            <br />* 1매 이상 판매된 티켓은 삭제할 수 없습니다.
          </Styled.TicketGroupDescription>
        </Styled.TicketGroupInfo>
        <Styled.TicketAddButtonContainer>
          <Button
            type="button"
            colorTheme="netural"
            size="bold"
            icon={<PlusIcon />}
            onClick={() => {
              salesTicketDialog.open({
                title: '일반 티켓 생성하기',
                content: <SalesTicketForm onSubmit={handleSubmitTicket} />,
              });
            }}
          >
            생성하기
          </Button>
        </Styled.TicketAddButtonContainer>
      </Styled.TicketGroupHeader>
      {salesTicketList.length > 0 && (
        <Styled.TicketList>
          {salesTicketList.map((ticket) => (
            <Styled.Ticket key={ticket.name}>
              <Styled.TicketInfo>
                <Styled.TicketTitle>
                  <Styled.TicketTitleText>{ticket.name}</Styled.TicketTitleText>
                  <Badge colorTheme="red">
                    재고 {ticket.quantity}/{ticket.quantity}
                  </Badge>
                </Styled.TicketTitle>
                <Styled.TicketDescription>{ticket.price}원 · 1인당 1매</Styled.TicketDescription>
              </Styled.TicketInfo>
              <Styled.TicketAction>
                <Button
                  type="button"
                  colorTheme="line"
                  size="bold"
                  onClick={() => onDeleteTicket(ticket)}
                >
                  삭제하기
                </Button>
              </Styled.TicketAction>
            </Styled.Ticket>
          ))}
        </Styled.TicketList>
      )}
    </Styled.TicketGroup>
  );
};

export default ShowSalesTicketFormContent;
