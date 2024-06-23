import Styled from './GiftRegisterPage.styles';
import { useSearchParams } from 'react-router-dom';

const GiftRegisterPage = () => {
  const [searchParams] = useSearchParams();
  const giftUuid = searchParams.get('uuid');

  console.log(giftUuid);
  return <Styled.Container>선물페이지</Styled.Container>;
};

export default GiftRegisterPage;
