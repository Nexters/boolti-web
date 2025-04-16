import { Container, NaverMap, useNavermaps } from 'react-naver-maps';

import Styled from './PreviewMap.styles';
import { CurvedArrowRightIcon } from '@boolti/icon';

interface Props {
  latitude: number;
  longitude: number;
}

const PreviewMap = ({ latitude, longitude }: Props) => {
  const navermaps = useNavermaps();
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
      />
      <Styled.Button>
        <CurvedArrowRightIcon />
      </Styled.Button>
    </Container>
  );
};

export default PreviewMap;
