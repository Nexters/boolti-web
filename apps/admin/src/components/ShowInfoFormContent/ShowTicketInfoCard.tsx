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
  console.log(ticket);
  return (
    <Styled.Ticket key={ticket.id ?? ticket.name}>
      <Styled.TicketContent>
        <Styled.TicketInfo>
          <Styled.TicketTitle>
            <NewBadge colorTheme={ticket.quantity === 0 ? 'grey' : 'red'}>키워드</NewBadge>
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
