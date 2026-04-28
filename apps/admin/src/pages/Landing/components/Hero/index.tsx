import heroLogo from '~/assets/landing-v2/hero-logo.svg';
import hero1 from '~/assets/landing-v2/hero-1.png';
import hero2 from '~/assets/landing-v2/hero-2.png';
import hero3 from '~/assets/landing-v2/hero-3.png';
import hero4 from '~/assets/landing-v2/hero-4.png';
import hero5 from '~/assets/landing-v2/hero-5.png';

import { LANDING_COPY } from '../../constants';
import { useVisibleSectionAtom } from '../../atoms/visibleSectionAtom';
import Styled from './Hero.styles';

const HERO_IMAGES = [hero1, hero2, hero3, hero4, hero5];

const Hero = () => {
  const { ref } = useVisibleSectionAtom('hero');

  return (
    <Styled.Section ref={ref} id="hero">
      <Styled.Container>
        <Styled.TextBlock>
          <Styled.Eyebrow>{LANDING_COPY.hero.eyebrow}</Styled.Eyebrow>
          <Styled.Title
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', duration: 1.2, bounce: 0.2, delay: 0.12 }}
          >
            <span>{LANDING_COPY.hero.titleLead}</span>
            <Styled.TitleRow>
              {LANDING_COPY.hero.titleTrail}
              <Styled.LogoMark>
                <img src={heroLogo} alt="불티" />
              </Styled.LogoMark>
            </Styled.TitleRow>
          </Styled.Title>
        </Styled.TextBlock>
        <Styled.ImageRow>
          <Styled.MarqueeTrack>
            {[...HERO_IMAGES, ...HERO_IMAGES].map((src, index) => (
              <Styled.ImageCard key={index} src={src} alt="" aria-hidden />
            ))}
          </Styled.MarqueeTrack>
        </Styled.ImageRow>
      </Styled.Container>
    </Styled.Section>
  );
};

export default Hero;
