import payment from '~/assets/landing-v2/payment.png';
import promo1 from '~/assets/landing-v2/promo-1.png';
import promo2 from '~/assets/landing-v2/promo-2.png';

import { LANDING_COPY } from '../../constants';
import { useVisibleSectionAtom } from '../../atoms/visibleSectionAtom';
import Styled from './SolutionHighlight.styles';

const HIGHLIGHT_MEDIA = [
  <Styled.PromoStack>
    <Styled.PromoImage src={promo1} alt="" aria-hidden offset="back" />
    <Styled.PromoImage src={promo2} alt="" aria-hidden offset="front" />
  </Styled.PromoStack>,
  <Styled.PaymentWrap>
    <Styled.PaymentImage src={payment} alt="" aria-hidden />
  </Styled.PaymentWrap>,
];

const SolutionHighlight = () => {
  const { ref } = useVisibleSectionAtom('solution-highlight');

  return (
    <Styled.Section ref={ref} id="solution-highlight">
      <Styled.Title>{LANDING_COPY.solutionHighlight.title}</Styled.Title>
      <Styled.ScrollArea>
        {LANDING_COPY.solutionHighlight.items.map((item, index) => (
          <Styled.Card key={item.chip} variant={item.variant}>
            <Styled.TextCard>
              <Styled.Chip>{item.chip}</Styled.Chip>
              <Styled.CardTitle>{item.title}</Styled.CardTitle>
              <Styled.CardDescription>{item.description}</Styled.CardDescription>
            </Styled.TextCard>
            <Styled.ImgCard variant={item.variant}>{HIGHLIGHT_MEDIA[index]}</Styled.ImgCard>
          </Styled.Card>
        ))}
      </Styled.ScrollArea>
    </Styled.Section>
  );
};

export default SolutionHighlight;
