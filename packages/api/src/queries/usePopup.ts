import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const usePopup = () => useQuery(queryKeys.popup.info);

export default usePopup;
