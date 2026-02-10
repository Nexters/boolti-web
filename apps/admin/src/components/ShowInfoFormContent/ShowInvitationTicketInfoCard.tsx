import { NewBadge, TextButton } from '@boolti/ui';
import Styled from './ShowInfoFormContent.styles';
import { TrashIcon } from '@boolti/icon';
import ShowInvitationCodeList from './ShowInvitationCodeList';
import { InvitationTicket } from './ShowInvitationTicketFormContent';

interface Props {
  ticket: InvitationTicket;
  fullEditable?: boolean;
  disabled?: boolean;
  onDeleteTicket: (ticket: Props['ticket']) => void;
  isDeleteDisabled: boolean;
  isShowEnded?: boolean;
}

export const ShowInvitationTicketInfoCard = ({
  ticket,
  fullEditable,
  disabled,
  onDeleteTicket,
  isDeleteDisabled,
  isShowEnded,
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
          <Styled.TicketDescription>
            판매 {ticket.totalForSale - ticket.quantity}/{ticket.totalForSale}{' '}
            {ticket.quantity === 0 ? `[품절]` : ''}
          </Styled.TicketDescription>
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
        <Styled.MobileTicketAction disabled={disabled}>
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
      {ticket.id !== undefined && (
        <Styled.TicketCodeListContainer>
          <ShowInvitationCodeList invitationTicketId={ticket.id} isShowEnded={isShowEnded} />
        </Styled.TicketCodeListContainer>
      )}
    </Styled.Ticket>
  );
};
