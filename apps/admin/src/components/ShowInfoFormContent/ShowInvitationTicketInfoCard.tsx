import { Button, NewBadge, TextButton } from '@boolti/ui';
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
  return (
    <Styled.Ticket key={ticket.id ?? ticket.name}>
      <Styled.TicketContent>
        <Styled.TicketInfo>
          <Styled.TicketTitle>
            <NewBadge colorTheme={ticket.quantity === 0 ? 'grey' : 'red'}>
              재고 {ticket.quantity}/{ticket.totalForSale}
            </NewBadge>
            <Styled.TicketTitleText>{ticket.name}</Styled.TicketTitleText>
          </Styled.TicketTitle>
          <Styled.TicketDescription>1인 1매</Styled.TicketDescription>
        </Styled.TicketInfo>
        <Styled.TicketAction>
          <Button
            type="button"
            colorTheme="line"
            size="bold"
            disabled={(() => {
              if (disabled) return disabled;
              if (fullEditable) return false;

              return isDeleteDisabled;
            })()}
            onClick={() => onDeleteTicket(ticket)}
          >
            삭제하기
          </Button>
        </Styled.TicketAction>
        <Styled.MobileTicketAction disabled={disabled}>
          <TextButton
            type="button"
            colorTheme="netural"
            size="small"
            icon={<TrashIcon />}
            disabled={(() => {
              if (disabled) return disabled;
              if (fullEditable) return false;

              return isDeleteDisabled;
            })()}
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
