import { generatePath, useNavigate, useParams } from 'react-router-dom';
import Styled from './GiftIntroPage.styles';
import invitationImg from '~/assets/images/gift-invitation.png';
import unknownGiftImg from '~/assets/images/unknown-gift-invitation.png';
import { PATH } from '~/constants/routes';
import { useGift } from '@boolti/api';

const GiftIntroPage = () => {
  const { giftId = '' } = useParams<{ giftId: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGift(giftId);
  return (
    <Styled.Container>
      {!isLoading && (
        <>
          <Styled.Description>
            {error ? (
              '유효하지 않은 선물이에요.'
            ) : (
              <>
                <strong>{data?.recipientName}</strong>님이 선물을 보냈어요.{'\n'}터치해서 확인해
                보세요!
              </>
            )}
          </Styled.Description>
          {error ? (
            <Styled.LetterImg src={unknownGiftImg} alt="" draggable={false} />
          ) : (
            <Styled.Button
              role="link"
              onClick={() => {
                if (giftId) {
                  navigate(generatePath(PATH.GIFT_REGISTER, { giftId }), { replace: true });
                }
              }}
            >
              <Styled.LetterImg src={invitationImg} alt="" draggable={false} />
            </Styled.Button>
          )}
        </>
      )}
    </Styled.Container>
  );
};

export default GiftIntroPage;
