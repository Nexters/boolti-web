import { Container, Marker, NaverMap, useNavermaps } from 'react-naver-maps';
import { checkIsAndroid, checkIsIOS, checkIsWebView } from '@boolti/bridge';

import Styled from './PreviewMap.styles';
import { CurvedArrowRightIcon } from '@boolti/icon';
import { useConfirm } from '../../hooks';

import markerImageUrl from '../../assets/images/marker.png'


interface Props {
  latitude: number;
  longitude: number;
  name: string;
  isAppWebview: boolean;
}

const CONFIRM_LOCAL_STORAGE_KEY = 'BOOLTI_PREVIEW_MAP_OPEN_NAVER_MAP';

const PreviewMap = ({ latitude, longitude, name, isAppWebview }: Props) => {
  const confirm = useConfirm();
  const navermaps = useNavermaps();

  const openNaverMaps = async () => {
    if (!localStorage.getItem(CONFIRM_LOCAL_STORAGE_KEY)) {
      if (!isAppWebview) {
        const isConfirm = await confirm(
          <Styled.ConfirmText>
            길찾기를 위해{'\n'}네이버 지도로 이동합니다.
            <Styled.ConfirmDescription>* 이 안내는 한 번만 표시됩니다.</Styled.ConfirmDescription>
          </Styled.ConfirmText>,
          {
            cancel: '취소하기',
            confirm: '이동하기',
          },
        );

        if (!isConfirm) {
          return;
        }
      }

      localStorage.setItem(CONFIRM_LOCAL_STORAGE_KEY, new Date().valueOf().toString());
    }

    const clickedAt = +new Date();
    const params = `lat=${latitude}&lng=${longitude}&name=${encodeURIComponent(name)}`;

    if (!checkIsWebView()) {
      window.open(`https://map.naver.com?${params}&c=17.86,0,0,0,dh`, '_blank');
      return;
    }

    if (checkIsAndroid()) {
      location.href = `intent://place?${params}&appname=com.nexters.boolti#Intent;scheme=nmap;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.nhn.android.nmap;end`;
    } else if (checkIsIOS()) {
      location.href = `nmap://place?${params}&appname=com.nexters.boolti`;

      setTimeout(function () {
        if (+new Date() - clickedAt < 2000) {
          location.href = 'http://itunes.apple.com/app/id311867728?mt=8';
        }
      }, 1500);
    }
  };
  return (
    <Container
      style={{ height: 140, borderRadius: 8 }}
      innerStyle={{
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 0,
        borderRadius: 8,
      }}
      onClick={openNaverMaps}
    >
      <NaverMap
        draggable={false}
        pinchZoom={false}
        scrollWheel={false}
        keyboardShortcuts={false}
        disableDoubleTapZoom={true}
        disableDoubleClickZoom={true}
        disableTwoFingerTapZoom={true}
        scaleControl={false}
        logoControl={false}
        mapDataControl={false}
        zoomControl={false}
        mapTypeControl={false}
        zoom={18}
        defaultCenter={new navermaps.LatLng(latitude, longitude)}
      >
        <Marker position={new navermaps.LatLng(latitude, longitude)} icon={{ url: markerImageUrl, size: { width: 48, height: 61 } }} />
      </NaverMap>
      <Styled.Button>
        <CurvedArrowRightIcon />
      </Styled.Button>
    </Container>
  );
};

export default PreviewMap;
