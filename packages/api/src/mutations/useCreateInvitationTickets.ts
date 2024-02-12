import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

interface PostCreateInvitationTicketRequest {
  showId: number;
  ticketName: string;
  totalForSale: number;
}

const postCreateInvitationTicket = (body: PostCreateInvitationTicketRequest) =>
  fetcher.post('web/v1/host/invitation-tickets', { json: body });

const useCreateInvitationTickets = () =>
  useMutation((body: PostCreateInvitationTicketRequest[]) =>
    Promise.all(body.map((ticket) => postCreateInvitationTicket(ticket))),
  );

export default useCreateInvitationTickets;
