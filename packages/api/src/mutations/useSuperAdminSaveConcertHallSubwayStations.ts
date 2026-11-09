import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

interface SaveConcertHallSubwayStationsParams {
  hallId: number;
  stationIds: number[];
}

const putSubwayStations = ({ hallId, stationIds }: SaveConcertHallSubwayStationsParams) =>
  fetcher.put(`sa-api/v1/concert-halls/${hallId}/subway-stations`, {
    json: { stationIds },
  });

const useSuperAdminSaveConcertHallSubwayStations = () =>
  useMutation((params: SaveConcertHallSubwayStationsParams) => putSubwayStations(params));

export default useSuperAdminSaveConcertHallSubwayStations;
