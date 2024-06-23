import { boldText } from '~/utils/boldText';
import Styled from './GiftReceive.styles';
import giftLetterImg from '~/assets/images/gift-letter.png';

interface Props {
  sender: string;
  openGift: () => void;
}

const GiftReceive = ({ sender, openGift }: Props) => {
  const description = `${sender}님이 선물을 보냈어요.<br />터치해서 확인해 보세요!`;
  return (
    <Styled.Container>
      <Styled.Description
        dangerouslySetInnerHTML={{ __html: boldText(description, sender) }}
      ></Styled.Description>
      <Styled.LetterImg src={giftLetterImg} alt="선물봉투" onClick={() => openGift()} />
    </Styled.Container>
  );
};

export default GiftReceive;
