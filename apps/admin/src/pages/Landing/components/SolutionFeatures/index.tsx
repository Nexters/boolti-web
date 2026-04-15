import entryAsis from '~/assets/landing-v2/entry-asis.png';
import entryTobe from '~/assets/landing-v2/entry-tobe.png';
import notifyAsis from '~/assets/landing-v2/notify-asis.png';
import notifyTobe from '~/assets/landing-v2/notify-tobe.png';
import salesAsis from '~/assets/landing-v2/sales-asis.png';
import salesTobe from '~/assets/landing-v2/sales-tobe.png';
import statsAsis from '~/assets/landing-v2/stats-asis.png';
import statsTobe from '~/assets/landing-v2/stats-tobe.png';

import { LANDING_COPY } from '../../constants';
import { useVisibleSectionAtom } from '../../atoms/visibleSectionAtom';
import FeatureCard from '../FeatureCard';
import Styled from './SolutionFeatures.styles';

const FEATURE_MEDIA = [
  { asis: salesAsis, tobe: salesTobe },
  { asis: notifyAsis, tobe: notifyTobe },
  { asis: entryAsis, tobe: entryTobe },
  { asis: statsAsis, tobe: statsTobe },
];

const SolutionFeatures = () => {
  const { ref } = useVisibleSectionAtom('solution-features');

  return (
    <Styled.Section ref={ref} id="solution-features">
      <Styled.Heading>
        <Styled.Eyebrow>{LANDING_COPY.solutionFeatures.eyebrow}</Styled.Eyebrow>
        <Styled.TitleRow>
          <span>{LANDING_COPY.solutionFeatures.titleLead}</span>
          <span>{LANDING_COPY.solutionFeatures.titleTrail}</span>
        </Styled.TitleRow>
      </Styled.Heading>
      <Styled.CardList>
        {LANDING_COPY.solutionFeatures.items.map((item, index) => (
          <FeatureCard
            key={item.chip}
            chip={item.chip}
            title={item.title}
            description={item.description}
            asisSrc={FEATURE_MEDIA[index].asis}
            tobeSrc={FEATURE_MEDIA[index].tobe}
          />
        ))}
      </Styled.CardList>
    </Styled.Section>
  );
};

export default SolutionFeatures;
