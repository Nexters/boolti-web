import { NewBadge, TextButton } from '@boolti/ui';
import Styled from './ShowInfoFormContent.styles';
import { TrashIcon, SettingIcon } from '@boolti/icon';
import ShowInvitationCodeList from './ShowInvitationCodeList';
import { SalesTicket } from './ShowSalesTicketFormContent';
import { InvitationTicket } from './ShowInvitationTicketFormContent';

type Ticket = SalesTicket | InvitationTicket;

interface Props<T extends Ticket> {
  ticket: T;
  ticketType: 'sales' | 'invitation';
  fullEditable?: boolean;
  disabled?: boolean;
  hideStatus?: boolean;
  onDeleteTicket: (ticket: T) => void;
  isDeleteDisabled: boolean;
  isShowEnded?: boolean;
  actionType?: 'delete' | 'setting';
  onSettingClick?: (ticket: T) => void;
}

const TicketInfoCard = <T extends Ticket>({
  ticket,
  ticketType,
  fullEditable,
  disabled,
  hideStatus,
  onDeleteTicket,
  isDeleteDisabled,
  isShowEnded,
  actionType = 'delete',
  onSettingClick,
}: Props<T>) => {
  const ticketStatus = disabled ? '판매 종료' : ticket.isPaused ? '판매 중단' : '판매 운영';
  const mobileTicketStatus = disabled ? '종료' : ticket.isPaused ? '중단' : '운영';
  const ticketColorTheme =
    ticketStatus === '판매 종료' ? 'grey' : ticketStatus === '판매 중단' ? 'red' : 'green';

  const isDeleteAction = actionType === 'delete';
  const actionIcon = isDeleteAction ? <TrashIcon /> : <SettingIcon />;
  const actionLabel = isDeleteAction ? '삭제' : '설정';
  const isActionDisabled = isDeleteAction
    ? disabled || (!fullEditable && isDeleteDisabled)
    : disabled;
  const handleActionClick = () => {
    if (isDeleteAction) {
      onDeleteTicket(ticket);
    } else {
      onSettingClick?.(ticket);
    }
  };

  const isSalesTicket = ticketType === 'sales';
  const isInvitationTicket = ticketType === 'invitation';

  return (
    <Styled.Ticket key={ticket.id ?? ticket.name}>
      <Styled.TicketContent>
        <Styled.TicketInfo>
          <Styled.TicketTitle>
            {!hideStatus && (
              <>
                <Styled.DesktopTicketBadge>
                  <NewBadge colorTheme={ticketColorTheme}>{ticketStatus}</NewBadge>
                </Styled.DesktopTicketBadge>
                <Styled.MobileTicketBadge>
                  <NewBadge colorTheme={ticketColorTheme}>{mobileTicketStatus}</NewBadge>
                </Styled.MobileTicketBadge>
              </>
            )}
            <Styled.TicketTitleText>{ticket.name}</Styled.TicketTitleText>
          </Styled.TicketTitle>
          {isSalesTicket && 'price' in ticket ? (
            <Styled.TicketInfoRow>
              <Styled.TicketDescription>{ticket.price}원</Styled.TicketDescription>
              <Styled.TicketDescription>∙</Styled.TicketDescription>
              <Styled.TicketDescription>
                판매 {ticket.totalForSale - ticket.quantity}/{ticket.totalForSale}{' '}
                {ticket.quantity === 0 ? `[품절]` : ''}
              </Styled.TicketDescription>
            </Styled.TicketInfoRow>
          ) : (
            <Styled.TicketDescription>
              판매 {ticket.totalForSale - ticket.quantity}/{ticket.totalForSale}{' '}
              {ticket.quantity === 0 ? `[품절]` : ''}
            </Styled.TicketDescription>
          )}
        </Styled.TicketInfo>
        <Styled.TicketAction>
          <TextButton
            type="button"
            colorTheme="netural"
            size="small"
            icon={actionIcon}
            disabled={isActionDisabled}
            onClick={handleActionClick}
          >
            {actionLabel}
          </TextButton>
        </Styled.TicketAction>
        <Styled.MobileTicketAction disabled={isActionDisabled}>
          <TextButton
            type="button"
            colorTheme="netural"
            size="small"
            icon={actionIcon}
            disabled={isActionDisabled}
            onClick={handleActionClick}
          />
        </Styled.MobileTicketAction>
      </Styled.TicketContent>
      {isInvitationTicket && ticket.id !== undefined && (
        <Styled.TicketCodeListContainer>
          <ShowInvitationCodeList invitationTicketId={ticket.id} isShowEnded={isShowEnded} />
        </Styled.TicketCodeListContainer>
      )}
    </Styled.Ticket>
  );
};

export default TicketInfoCard;
