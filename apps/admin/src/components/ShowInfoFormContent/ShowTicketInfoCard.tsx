import { SalesTicket } from './ShowSalesTicketFormContent';
import Styled from './ShowInfoFormContent.styles';
import { NewBadge, TextButton } from '@boolti/ui';
import { TrashIcon } from '@boolti/icon';

interface Props {
  ticket: SalesTicket;
  fullEditable: boolean;
  disabled?: boolean;
  onDeleteTicket: (ticket: SalesTicket) => void;
  isDeleteDisabled: boolean;
}

const ShowTicketInfoCard = ({
  ticket,
  fullEditable,
  disabled,
  onDeleteTicket,
  isDeleteDisabled,
}: Props) => {
  const ticketStatus = disabled ? '판매 종료' : ticket.isPaused ? '판매 중단' : '구매 가능';
  const ticketColorTheme =
    ticketStatus === '판매 종료' ? 'grey' : ticketStatus === '판매 중단' ? 'red' : 'green';

  return (
    <Styled.Ticket key={ticket.id ?? ticket.name}>
      <Styled.TicketContent>
        <Styled.TicketInfo>
          <Styled.TicketTitle>
            <NewBadge colorTheme={ticketColorTheme}>{ticketStatus}</NewBadge>
            <Styled.TicketTitleText>{ticket.name}</Styled.TicketTitleText>
          </Styled.TicketTitle>
          <Styled.TicketInfoRow>
            <Styled.TicketDescription>{ticket.price}원</Styled.TicketDescription>
            <Styled.TicketDescription>∙</Styled.TicketDescription>
            <Styled.TicketDescription>판매 0/10</Styled.TicketDescription>
          </Styled.TicketInfoRow>
        </Styled.TicketInfo>
        <Styled.TicketAction>
          <TextButton
            type="button"
            colorTheme="netural"
            size="small"
            icon={<TrashIcon />}
            disabled={disabled || (!fullEditable && isDeleteDisabled)}
            onClick={() => onDeleteTicket(ticket)}
          >
            삭제
          </TextButton>
        </Styled.TicketAction>
        <Styled.MobileTicketAction>
          <TextButton
            type="button"
            colorTheme="netural"
            size="small"
            icon={<TrashIcon />}
            disabled={disabled || (!fullEditable && isDeleteDisabled)}
            onClick={() => onDeleteTicket(ticket)}
          />
        </Styled.MobileTicketAction>
      </Styled.TicketContent>
    </Styled.Ticket>
  );
};

export default ShowTicketInfoCard;
