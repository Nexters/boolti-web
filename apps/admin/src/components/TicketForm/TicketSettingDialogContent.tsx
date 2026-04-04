import { useSalesTicketList, useInvitationTicketList } from '@boolti/api';
import TicketSettingForm, { TicketSettingFormInputs } from './TicketSettingForm';
import { SubmitHandler } from 'react-hook-form';

const POLLING_INTERVAL = 3000;

interface SalesTicketSettingDialogContentProps {
  showId: number;
  ticketId: number;
  salesTicketCount: number;
  onSubmit: SubmitHandler<TicketSettingFormInputs>;
  onDelete: () => void;
}

export const SalesTicketSettingDialogContent = ({
  showId,
  ticketId,
  salesTicketCount,
  onSubmit,
  onDelete,
}: SalesTicketSettingDialogContentProps) => {
  const { data: salesTicketList } = useSalesTicketList(showId, {
    refetchInterval: POLLING_INTERVAL,
  });

  const ticket = salesTicketList?.find((t) => t.id === ticketId);
  if (!ticket) return null;

  const soldAtLeastOnce = ticket.soldAtLeastOnce ?? false;
  const isSingleTicket = salesTicketCount <= 1 && (salesTicketList?.length ?? 0) <= 1;
  const isDeleteDisabled = isSingleTicket || soldAtLeastOnce;

  const getDeleteDisabledReason = () => {
    if (isSingleTicket && soldAtLeastOnce) return 'both' as const;
    if (soldAtLeastOnce) return 'soldAtLeastOnce' as const;
    if (isSingleTicket) return 'singleTicket' as const;
    return undefined;
  };

  const latestSoldQuantity = ticket.totalForSale - ticket.quantity;

  return (
    <TicketSettingForm
      key={ticketId}
      ticketType="sales"
      defaultValues={{
        name: ticket.ticketName,
        price: ticket.price,
        totalForSale: ticket.totalForSale,
        quantity: ticket.quantity,
        isPaused: ticket.isPaused,
      }}
      latestSoldQuantity={latestSoldQuantity}
      soldAtLeastOnce={soldAtLeastOnce}
      isDeleteDisabled={isDeleteDisabled}
      deleteDisabledReason={getDeleteDisabledReason()}
      onSubmit={onSubmit}
      onDelete={onDelete}
    />
  );
};

interface InvitationTicketSettingDialogContentProps {
  showId: number;
  ticketId: number;
  onSubmit: SubmitHandler<TicketSettingFormInputs>;
  onDelete: () => void;
}

export const InvitationTicketSettingDialogContent = ({
  showId,
  ticketId,
  onSubmit,
  onDelete,
}: InvitationTicketSettingDialogContentProps) => {
  const { data: invitationTicketList } = useInvitationTicketList(showId, {
    refetchInterval: POLLING_INTERVAL,
  });

  const ticket = invitationTicketList?.find((t) => t.id === ticketId);
  if (!ticket) return null;

  const isSoldTicket = ticket.totalForSale > ticket.quantity;
  const latestSoldQuantity = ticket.totalForSale - ticket.quantity;

  return (
    <TicketSettingForm
      key={ticketId}
      ticketType="invitation"
      defaultValues={{
        name: ticket.ticketName,
        totalForSale: ticket.totalForSale,
        quantity: ticket.quantity,
        isPaused: ticket.isPaused,
      }}
      latestSoldQuantity={latestSoldQuantity}
      soldAtLeastOnce={isSoldTicket}
      isDeleteDisabled={isSoldTicket}
      deleteDisabledReason={isSoldTicket ? 'soldAtLeastOnce' : undefined}
      onSubmit={onSubmit}
      onDelete={onDelete}
    />
  );
};
