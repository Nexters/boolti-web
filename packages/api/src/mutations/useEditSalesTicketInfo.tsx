import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

interface EditSalesTicketInfoRequest {
  showId: number;
  salesStartTime: string;
  salesEndTime: string;
  ticketNotice: string;
}

const postEditSalesTicketInfo = ({
  showId,
  salesStartTime,
  salesEndTime,
  ticketNotice,
}: EditSalesTicketInfoRequest) =>
  fetcher.put(`web/v1/host/shows/${showId}/sales-infos`, {
    json: {
      salesStartTime,
      salesEndTime,
      ticketNotice,
    },
  });

const useEditSalesTicketInfo = () =>
  useMutation((data: EditSalesTicketInfoRequest) => postEditSalesTicketInfo(data));

export default useEditSalesTicketInfo;
