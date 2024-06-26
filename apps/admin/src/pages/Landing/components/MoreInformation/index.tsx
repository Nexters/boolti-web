import Styled from './MoreInformation.styles';

const MoerInformation = () => {
  const moreInfoPageLink = 'https://www.notion.so/boolti/Boolti-6de303e8cc0242ea8b3930ce33032aa2';

  return (
    <Styled.Container>
      <Styled.BackgroundLight />
      <Styled.Text>더욱 자세한 불티 이용 방법이{'\n'}궁금하시다면?</Styled.Text>
      <Styled.Button to={moreInfoPageLink}>이용 방법 보러 가기</Styled.Button>
    </Styled.Container>
  );
};

export default MoerInformation;
