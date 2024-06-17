import { useMutation } from "@tanstack/react-query";
import { fetcher } from "../fetcher";

const postSettlementDone = (showId: number) =>
  fetcher.post(`sa-api/v1/shows/${showId}/settlement-done`);


const useAdminSettlementDone = () => 
  useMutation((showId: number) =>
    postSettlementDone(showId),
  );

export default useAdminSettlementDone
