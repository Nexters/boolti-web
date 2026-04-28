import problem1 from '~/assets/landing-v2/problem-1.png';
import problem2 from '~/assets/landing-v2/problem-2.png';
import problem3 from '~/assets/landing-v2/problem-3.png';
import problem4 from '~/assets/landing-v2/problem-4.png';
import problem5 from '~/assets/landing-v2/problem-5.png';
import problem6 from '~/assets/landing-v2/problem-6.png';
import { useDeviceWidth } from '~/hooks/useDeviceWidth';

import { LANDING_BREAKPOINT, LANDING_COPY } from '../../constants';
import { useVisibleSectionAtom } from '../../atoms/visibleSectionAtom';
import Styled from './Problem.styles';

// Figma Desktop 1200px 절대 좌표
const DESKTOP_FLOATING_LOGOS = [
  { src: problem1, top: 164, left: 178, width: 291.64, height: 70.84 },
  { src: problem2, top: 440, left: 681, width: 291.64, height: 70.84 },
  { src: problem3, top: 370, left: 73.39, width: 287.24, height: 88.1 },
  { src: problem4, top: 55, left: 96, width: 260.97, height: 78.2 },
  { src: problem5, top: 126, left: 779.03, width: 317.95, height: 92.37 },
  { src: problem6, top: 325, left: 877.83, width: 240.59, height: 96.6 },
] as const;

// Figma Tablet 768px 절대 좌표
const TABLET_FLOATING_LOGOS = [
  { src: problem1, top: 115.22, left: 97.05, width: 202.88, height: 49.28 },
  { src: problem2, top: 324, left: 465.2, width: 202.88, height: 49.28 },
  { src: problem3, top: 280, left: 68.58, width: 199.82, height: 61.29 },
  { src: problem4, top: 37.97, left: 37.62, width: 181.76, height: 54.46 },
  { src: problem5, top: 95.2, left: 491.04, width: 221.18, height: 64.26 },
  { src: problem6, top: 246.23, left: 572, width: 167.68, height: 67.33 },
] as const;

// Figma Mobile 375px 절대 좌표
const MOBILE_FLOATING_LOGOS = [
  { src: problem1, top: 148.31, left: 44.9, width: 152.16, height: 36.96 },
  { src: problem2, top: 374.27, left: 185.17, width: 152.16, height: 36.96 },
  { src: problem3, top: 332.27, left: 17.73, width: 149.86, height: 45.96 },
  { src: problem4, top: 64.77, left: 15.56, width: 136.32, height: 40.85 },
  { src: problem5, top: 104.77, left: 196.31, width: 165.89, height: 48.19 },
  { src: problem6, top: 295.27, left: 233.5, width: 125.76, height: 50.49 },
] as const;

const Problem = () => {
  const { ref } = useVisibleSectionAtom('problem');
  const deviceWidth = useDeviceWidth();
  const isDesktop = deviceWidth >= LANDING_BREAKPOINT.desktop;
  const isMobile = deviceWidth < LANDING_BREAKPOINT.tablet;

  const logos = isDesktop
    ? DESKTOP_FLOATING_LOGOS
    : isMobile
      ? MOBILE_FLOATING_LOGOS
      : TABLET_FLOATING_LOGOS;
  const layerWidth = isDesktop ? 1200 : isMobile ? 375 : 768;

  return (
    <Styled.Section ref={ref} id="problem">
      <Styled.FloatingLayer layerWidth={layerWidth} aria-hidden>
        {logos.map(({ src, ...pos }, index) => (
          <Styled.FloatingLogo key={index} {...pos} src={src} />
        ))}
      </Styled.FloatingLayer>
      <Styled.Title>{LANDING_COPY.problem.title}</Styled.Title>
    </Styled.Section>
  );
};

export default Problem;
