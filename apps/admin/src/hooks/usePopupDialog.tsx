import { useEffect } from 'react';
import useCookie from './useCookie';
import { useDialog } from '@boolti/ui';
import { Popup } from '@boolti/api';
import NoticePopupContent from '~/components/NoticePopupContent';
import EventPopupContent from '~/components/EventPopupContent';

const usePopupDialog = (popupData?: Popup) => {
  const eventPopupDialog = useDialog();
  const noticePopupDialog = useDialog();
  const { getCookie } = useCookie();

  useEffect(() => {
    if (!popupData) {
      return;
    }
    const today = new Date();
    const startDate = new Date(popupData.startDate);
    const endDate = new Date(popupData.endDate);
    if (!(startDate <= today && today <= endDate)) {
      return;
    }
    const hasCookie = !!getCookie('popup');

    switch (popupData.type) {
      case 'EVENT':
        if (hasCookie) {
          return;
        }
        eventPopupDialog.open({
          content: (
            <EventPopupContent
              id={popupData.id}
              imagePath={popupData.description}
              detailPath={popupData.eventUrl}
              onClose={eventPopupDialog.close}
            />
          ),
          mobileType: 'centerPopup',
          isAuto: true,
          contentPadding: '0',
        });
        return;
      case 'NOTICE':
        noticePopupDialog.open({
          content: (
            <NoticePopupContent
              title={popupData.noticeTitle as string}
              description={popupData.description}
              onClose={noticePopupDialog.close}
            />
          ),
          mobileType: 'centerPopup',
          isAuto: true,
          contentPadding: '0',
        });
        return;
    }
  }, [popupData]);
};

export default usePopupDialog;
