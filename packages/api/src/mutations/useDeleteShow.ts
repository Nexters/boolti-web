import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

const deleteShow = (showId: number) => fetcher.delete(`web/v1/host/shows/${showId}`);

const useDeleteShow = () => useMutation((showId: number) => deleteShow(showId));

export default useDeleteShow;
