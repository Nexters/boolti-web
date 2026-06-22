import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { SuperAdminConcertHallShowValidateResponse } from '../types/superAdminConcertHall';

interface ValidateConcertHallShowParams {
  hallId: number;
  showId: number;
}

// 사용자가 "연결하기"를 누른 시점에만 호출되는 검증 요청이라 query 대신 mutation으로 제공한다.
const getValidateShow = ({ hallId, showId }: ValidateConcertHallShowParams) =>
  fetcher.get<SuperAdminConcertHallShowValidateResponse>(
    `sa-api/v1/concert-halls/${hallId}/shows/validate`,
    { searchParams: { showId } },
  );

const useSuperAdminValidateConcertHallShow = () =>
  useMutation((params: ValidateConcertHallShowParams) => getValidateShow(params));

export default useSuperAdminValidateConcertHallShow;
