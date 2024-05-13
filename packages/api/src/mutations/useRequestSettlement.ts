import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

const requestSettlement = (showId: number) =>
  fetcher.post(`web/v1/host/shows/${showId}/settlement-request`);

const useRequestSettlement = () => useMutation((showId: number) => requestSettlement(showId));

export default useRequestSettlement;
