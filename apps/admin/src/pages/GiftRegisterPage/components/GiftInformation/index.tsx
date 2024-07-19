import { useConfirm } from '@boolti/ui';
import Styled from './GiftInformation.styles';
import { ChevronRightIcon } from '@boolti/icon';
import { useParams } from 'react-router-dom';
import { useGift } from '@boolti/api';
import { format } from 'date-fns/format';
import { GiftStatus } from '@boolti/api/src/types/gift';

const GiftInformation = () => {
  const confirm = useConfirm();
  const { giftId = '' } = useParams<{ giftId: string }>();
  const { data } = useGift(giftId);

  const { recipientName, message, showId, status, giftImageUrl, showImageUrl, showDate, showName } =
    data ?? {};

  const isRegistered = status === GiftStatus.REGISTERED;
  const isCancelled = status === GiftStatus.CANCELLED;
  const isRejected = status === GiftStatus.REJECTED;
  const isRegistrable = status === GiftStatus.REGISTRABLE;
  const showDetailLink = `https://boolti.page.link/?link=https://preview.boolti.in/show/${showId}&apn=com.nexters.boolti&ibi=com.nexters.boolti&isi=6476589322`;
  const giftRegisterLink = `https://boolti.page.link/?link=https://app.boolti.in/gift/${giftId}&apn=com.nexters.boolti&ibi=com.nexters.boolti&isi=6476589322`;

  return (
    <>
      <Styled.Container>
        <Styled.Wrapper>
          <Styled.Recipient>TO. {recipientName}</Styled.Recipient>
          <Styled.InvitationDescription>{message}</Styled.InvitationDescription>
          <Styled.InvitationImage src={giftImageUrl} alt="초대장 이미지" draggable={false} />
        </Styled.Wrapper>
        <Styled.ShowContainer>
          <Styled.PosterImage src={showImageUrl} alt="포스터 이미지" draggable={false} />
          <Styled.ShowInformation>
            <Styled.ShowTitle>{showName}</Styled.ShowTitle>
            <Styled.ShowDetailLink onClick={() => (window.location.href = showDetailLink)}>
              공연 자세히 보기
              <ChevronRightIcon />
            </Styled.ShowDetailLink>
          </Styled.ShowInformation>
        </Styled.ShowContainer>
      </Styled.Container>
      <Styled.Footer>
        {isRegistrable && (
          <Styled.RegisterDescription>
            <Styled.ExpireDate>
              {format(showDate ?? new Date(), 'yyyy년 M월 d일')}
            </Styled.ExpireDate>
            까지 선물을 등록해 주세요
          </Styled.RegisterDescription>
        )}
        <Styled.Button
          disabled={!isRegistrable}
          onClick={async () => {
            const result = await confirm(
              '불티 앱에서만 이용이 가능합니다.스토어로 이동하시겠습니까?',
              {
                cancel: '취소하기',
                confirm: '이동하기',
              },
            );
            if (result) {
              window.location.href = giftRegisterLink;
            }
          }}
        >
          {isRegistered && '등록한 선물'}
          {(isCancelled || isRejected) && (
            <>
              취소된 선물 -
              <Styled.CancelText>
                {isCancelled && ' 보낸 분 취소'}
                {isRejected && ' 받는 분 거절'}
              </Styled.CancelText>
            </>
          )}
          {isRegistrable && '선물 등록하기'}
        </Styled.Button>
      </Styled.Footer>
    </>
  );
};

export default GiftInformation;
