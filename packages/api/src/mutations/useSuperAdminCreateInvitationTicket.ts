import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { SuperAdminCreateInvitationTicketRequest } from '../types/adminTicket';

const postCreateInvitationTicket = (body: SuperAdminCreateInvitationTicketRequest) =>
  fetcher.post('sa-api/v1/invitation-tickets', { json: body });

const useSuperAdminCreateInvitationTicket = () =>
  useMutation((body: SuperAdminCreateInvitationTicketRequest) => postCreateInvitationTicket(body));

export default useSuperAdminCreateInvitationTicket;
