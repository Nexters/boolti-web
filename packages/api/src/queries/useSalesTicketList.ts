import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useSalesTicketList = (showId: number) => useQuery(queryKeys.show.salesTicketList(showId));

export default useSalesTicketList;
