import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

const deleteIDCardPhotoFile = (showId: string) =>
  fetcher.delete(`web/v1/host/shows/${showId}/settlement-infos/id-card-photo-file`);

const useUploadIDCardPhotoFile = (showId: number) =>
  useMutation(() => deleteIDCardPhotoFile(`${showId}`));

export default useUploadIDCardPhotoFile;
