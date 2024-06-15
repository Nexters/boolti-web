import { useTheme } from '@emotion/react';

import { useDeviceWidth } from '~/hooks/useDeviceWidth';

import Styled from './MoreInformation.styles';

const MoerInformation = () => {
  const deviceWidth = useDeviceWidth();
  const theme = useTheme();
  return (
    <Styled.Container>
      <Styled.BackgroundLight />
      <Styled.Text>더욱 자세한 불티 이용 방법이{'\n'}궁금하시다면?</Styled.Text>
      <Styled.Button
        colorTheme="primary"
        size={deviceWidth >= parseInt(theme.breakpoint.mobile, 10) ? 'bold' : 'regular'}
      >
        이용 방법 보러 가기
      </Styled.Button>
    </Styled.Container>
  );
};

export default MoerInformation;
