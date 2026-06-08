import { ReactNode } from 'react';

import arrowSvg from '~/assets/landing-v2/arrow.svg';

import Styled from './FeatureCard.styles';

interface FeatureCardProps {
  chip: string;
  title: string;
  description: string;
  asisSrc?: string;
  tobeSrc?: string;
  media?: ReactNode;
  className?: string;
}

const FeatureCard = ({
  chip,
  title,
  description,
  asisSrc,
  tobeSrc,
  media,
  className,
}: FeatureCardProps) => {
  return (
    <Styled.Card className={className}>
      <Styled.TextArea>
        <Styled.Chip>{chip}</Styled.Chip>
        <Styled.TitleBlock>
          <Styled.Title>{title}</Styled.Title>
          <Styled.Description>{description}</Styled.Description>
        </Styled.TitleBlock>
      </Styled.TextArea>
      {media ??
        (asisSrc && tobeSrc ? (
          <Styled.Media>
            <Styled.MediaImage src={asisSrc} alt="" aria-hidden />
            <Styled.MediaImage src={tobeSrc} alt="" aria-hidden />
            <Styled.MediaArrow aria-hidden>
              <img src={arrowSvg} alt="" />
            </Styled.MediaArrow>
          </Styled.Media>
        ) : null)}
    </Styled.Card>
  );
};

export default FeatureCard;
