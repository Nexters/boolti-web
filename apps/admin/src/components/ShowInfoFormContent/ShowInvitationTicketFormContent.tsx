import { PlusIcon } from '@boolti/icon';
import { Badge, Button, useDialog } from '@boolti/ui';
import { SubmitHandler } from 'react-hook-form';

import InvitationTicketForm, {
  InvitationTicketFormInputs,
} from '../TicketForm/InvitationTicketForm';
import Styled from './ShowInfoFormContent.styles';

interface ShowInvitationTicketFormContentProps {
  invitationTicketList: InvitationTicketFormInputs[];
  onSubmitTicket: SubmitHandler<InvitationTicketFormInputs>;
  onDeleteTicket: (ticket: InvitationTicketFormInputs) => void;
}

const ShowInvitationTicketFormContent = ({
  invitationTicketList,
  onSubmitTicket,
  onDeleteTicket,
}: ShowInvitationTicketFormContentProps) => {
  const invitationTicketDialog = useDialog();

  const handleSubmitTicket: SubmitHandler<InvitationTicketFormInputs> = (data) => {
    invitationTicketDialog.close();

    onSubmitTicket(data);
  };

  return (
    <Styled.TicketGroup>
      <Styled.TicketGroupHeader>
        <Styled.TicketGroupInfo>
          <Styled.TicketGroupTitle>초청 티켓</Styled.TicketGroupTitle>
          <Styled.TicketGroupDescription>
            초청 티켓 이용을 원하시면 티켓을 생성해주세요.
            <br />* 초청 코드는 공연 등록 후 <strong>공연 관리 &gt; 티켓 관리</strong>에서 확인할 수
            있습니다.
          </Styled.TicketGroupDescription>
        </Styled.TicketGroupInfo>
        <Styled.TicketAddButtonContainer>
          <Button
            type="button"
            colorTheme="netural"
            size="bold"
            icon={<PlusIcon />}
            onClick={() => {
              invitationTicketDialog.open({
                title: '초청 티켓 생성하기',
                content: <InvitationTicketForm onSubmit={handleSubmitTicket} />,
              });
            }}
          >
            생성하기
          </Button>
        </Styled.TicketAddButtonContainer>
      </Styled.TicketGroupHeader>
      {invitationTicketList.length > 0 && (
        <Styled.TicketList>
          {invitationTicketList.map((ticket) => (
            <Styled.Ticket key={ticket.name}>
              <Styled.TicketInfo>
                <Styled.TicketTitle>
                  <Styled.TicketTitleText>{ticket.name}</Styled.TicketTitleText>
                  <Badge colorTheme="red">
                    재고 {ticket.quantity}/{ticket.quantity}
                  </Badge>
                </Styled.TicketTitle>
                <Styled.TicketDescription>1인당 1매</Styled.TicketDescription>
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

export default ShowInvitationTicketFormContent;
