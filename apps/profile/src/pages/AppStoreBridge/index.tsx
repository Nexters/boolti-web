import { useEffect } from 'react';
import { navigateToAppScheme } from '~/utils/app';
import { openStoreLink } from '~/utils/link';
import { SCHEMES } from '~/constants/schemes';
import { BooltiGreyLogo } from '@boolti/icon';
import Styled from './AppStoreBridge.styles';

const AppStoreBridge = () => {
  useEffect(() => {
    const handleRedirect = async () => {
      const success = await navigateToAppScheme(SCHEMES.홈());

      if (!success) {
        openStoreLink();
      }
    };

    handleRedirect();
  }, []);

  return (
    <Styled.Container>
      <Styled.LogoWrapper>
        <BooltiGreyLogo />
      </Styled.LogoWrapper>
      <Styled.Title>불티 앱으로 이동 중...</Styled.Title>
      <Styled.Description>
        앱이 설치되지 않은 경우
        <br />
        스토어로 이동합니다
      </Styled.Description>
    </Styled.Container>
  );
};

export default AppStoreBridge;
