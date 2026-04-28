import { useNavigate } from 'react-router-dom';

import lightSvg from '~/assets/landing-v2/light.svg';
import { PATH } from '~/constants/routes';
import { useDeviceWidth } from '~/hooks/useDeviceWidth';
import { openStoreLink } from '~/utils/link';

import { LANDING_BREAKPOINT, LANDING_COPY } from '../../constants';
import { useVisibleSectionAtom } from '../../atoms/visibleSectionAtom';
import Styled from './HowToUse.styles';

const HowToUse = () => {
  const { ref } = useVisibleSectionAtom('how-to-use');
  const deviceWidth = useDeviceWidth();
  const navigate = useNavigate();
  const isMobile = deviceWidth < LANDING_BREAKPOINT.tablet;

  const handleSecondary = () => {
    if (isMobile) {
      openStoreLink();
      return;
    }
    navigate(PATH.QR);
  };

  return (
    <Styled.Section ref={ref} id="how-to-use">
      <Styled.Light src={lightSvg} alt="" aria-hidden />
      <Styled.Title>{LANDING_COPY.howToUse.title}</Styled.Title>
      <Styled.BtnWrap>
        <Styled.SecondaryButton type="button" onClick={handleSecondary}>
          {LANDING_COPY.howToUse.secondaryCta}
        </Styled.SecondaryButton>
        <Styled.PrimaryButton to={PATH.HOME}>
          {LANDING_COPY.howToUse.primaryCta}
        </Styled.PrimaryButton>
      </Styled.BtnWrap>
    </Styled.Section>
  );
};

export default HowToUse;
