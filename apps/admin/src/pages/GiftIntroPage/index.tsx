import { generatePath, useNavigate, useParams } from 'react-router-dom';
import Styled from './GiftIntroPage.styles';
import invitationImg from '~/assets/images/gift-invitation.png';
import { PATH } from '~/constants/routes';

const GiftIntroPage = () => {
  const sender = 'abc';
  const { giftId } = useParams<{ giftId: string }>();
  const navigate = useNavigate();
  return (
    <Styled.Container>
      <Styled.Description>
        <strong>{sender}</strong>님이 선물을 보냈어요.{'\n'}터치해서 확인해 보세요!
      </Styled.Description>
      <Styled.Button
        role="link"
        onClick={() => {
          if (giftId) {
            navigate(generatePath(PATH.GIFT_REGISTER, { giftId }), { replace: true });
          }
        }}
      >
        <Styled.LetterImg src={invitationImg} alt="선물봉투" />
      </Styled.Button>
    </Styled.Container>
  );
};

export default GiftIntroPage;
