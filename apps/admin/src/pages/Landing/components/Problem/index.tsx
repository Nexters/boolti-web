import problem1 from '~/assets/landing-v2/problem-1.png';
import problem2 from '~/assets/landing-v2/problem-2.png';
import problem3 from '~/assets/landing-v2/problem-3.png';
import problem4 from '~/assets/landing-v2/problem-4.png';
import problem5 from '~/assets/landing-v2/problem-5.png';
import problem6 from '~/assets/landing-v2/problem-6.png';

import { LANDING_COPY } from '../../constants';
import { useVisibleSectionAtom } from '../../atoms/visibleSectionAtom';
import Styled from './Problem.styles';

// Figma Desktop 1200px 절대 좌표
const FLOATING_LOGOS = [
  { src: problem1, top: 164, left: 178, width: 291.64, height: 70.84 },
  { src: problem2, top: 440, left: 681, width: 291.64, height: 70.84 },
  { src: problem3, top: 370, left: 73.39, width: 287.24, height: 88.1 },
  { src: problem4, top: 55, left: 96, width: 260.97, height: 78.2 },
  { src: problem5, top: 126, left: 779.03, width: 317.95, height: 92.37 },
  { src: problem6, top: 325, left: 877.83, width: 240.59, height: 96.6 },
] as const;

const Problem = () => {
  const { ref } = useVisibleSectionAtom('problem');

  return (
    <Styled.Section ref={ref} id="problem">
      <Styled.FloatingLayer aria-hidden>
        {FLOATING_LOGOS.map(({ src, ...pos }, index) => (
          <Styled.FloatingLogo key={index} {...pos} src={src} />
        ))}
      </Styled.FloatingLayer>
      <Styled.Title>{LANDING_COPY.problem.title}</Styled.Title>
    </Styled.Section>
  );
};

export default Problem;
