import { useConfirm } from '@boolti/ui';
import Styled from './GiftInformation.styles';
import { ChevronRightIcon } from '@boolti/icon';
import { useParams } from 'react-router-dom';
import { useGift } from '@boolti/api';
import { format } from 'date-fns/format';

const GiftInformation = () => {
  const confirm = useConfirm();

  const { giftId = '' } = useParams<{ giftId: string }>();
  const { data } = useGift(giftId);
  const { recipientName, message, giftImageUrl, showImageUrl, showDate, showName } = data ?? {};

  const isRegistered = false;
  const isCancelled = false;
  const isRejected = false;
  const isRegistable = !isRegistered && !isCancelled && !isRejected;

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
            <Styled.ShowDetailLink onClick={() => {}}>
              공연 자세히 보기
              <ChevronRightIcon />
            </Styled.ShowDetailLink>
          </Styled.ShowInformation>
        </Styled.ShowContainer>
      </Styled.Container>
      <Styled.Footer>
        {isRegistable && (
          <Styled.RegisterDescription>
            <Styled.ExpireDate>
              {format(showDate ?? new Date(), 'yyyy년 M월 d일')}
            </Styled.ExpireDate>
            까지 선물을 등록해 주세요
          </Styled.RegisterDescription>
        )}
        <Styled.Button
          disabled={!isRegistable}
          onClick={async () => {
            const result = await confirm(
              '불티 앱에서만 이용이 가능합니다.스토어로 이동하시겠습니까?',
              {
                cancel: '취소하기',
                confirm: '이동하기',
              },
            );
            if (result) {
              // store로 이동
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
          {isRegistable && '선물 등록하기'}
        </Styled.Button>
      </Styled.Footer>
    </>
  );
};

export default GiftInformation;
