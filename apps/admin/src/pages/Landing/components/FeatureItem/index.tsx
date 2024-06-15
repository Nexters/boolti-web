import Styled from './FeatureItem.styles';

interface Props {
  category: string;
  title: string;
  description: string;
  position: 'left' | 'right';
  imageSrc: string;
}

const FeatureItem = ({ category, title, description, position, imageSrc }: Props) => {
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
      <Styled.Image src={imageSrc} alt="" />
    </Styled.Container>
  );
};

export default FeatureItem;
