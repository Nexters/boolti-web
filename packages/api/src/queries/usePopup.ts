import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';
import { PopupViewType } from '../types';

const usePopup = (view: PopupViewType) => useQuery(queryKeys.popup.info(view));

export default usePopup;
