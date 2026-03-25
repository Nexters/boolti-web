import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

const deleteShow = (showId: number) => fetcher.delete(`sa-api/v1/shows/${showId}`);

const useSuperAdminDeleteShow = () => useMutation((showId: number) => deleteShow(showId));

export default useSuperAdminDeleteShow;
