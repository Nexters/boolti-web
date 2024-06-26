import Styled from './FeatureItem.styles';

interface Props {
  category: string;
  title: string;
  description: string;
  position: 'left' | 'right';
  imageSrc: string;
  maxWidth: [number, number, number];
  imagePadding?: [number, number];
}

const FeatureItem = ({
  category,
  title,
  description,
  position,
  imageSrc,
  maxWidth,
  imagePadding = [0, 0],
}: Props) => {
  return (
    <Styled.Container position={position}>
      <Styled.TextContainer>
        <Styled.CategoryText>
          {category}
          <Styled.Circle />
        </Styled.CategoryText>
        <Styled.Title>{title}</Styled.Title>
        <Styled.Description>{description}</Styled.Description>
      </Styled.TextContainer>
      <Styled.Image
        maxWidth={maxWidth}
        src={imageSrc}
        padding={imagePadding}
        position={position}
        alt=""
      />
    </Styled.Container>
  );
};

export default FeatureItem;
