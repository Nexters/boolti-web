import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

interface UseSalesTicketListOptions {
  refetchInterval?: number | false;
}

const useSalesTicketList = (showId: number, options?: UseSalesTicketListOptions) =>
  useQuery({
    ...queryKeys.show.salesTicketList(showId),
    ...(options?.refetchInterval !== undefined && { refetchInterval: options.refetchInterval }),
  });

export default useSalesTicketList;
