import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { SuperAdminEditSalesInfoRequest } from '../types/adminTicket';

const postEditSalesTicketInfo = ({
  showId,
  salesStartTime,
  salesEndTime,
  ticketNotice,
}: SuperAdminEditSalesInfoRequest) =>
  fetcher.put(`sa-api/v1/shows/${showId}/sales-infos`, {
    json: {
      salesStartTime,
      salesEndTime,
      ticketNotice,
    },
  });

const useSuperAdminEditSalesInfo = () =>
  useMutation((data: SuperAdminEditSalesInfoRequest) => postEditSalesTicketInfo(data));

export default useSuperAdminEditSalesInfo;
