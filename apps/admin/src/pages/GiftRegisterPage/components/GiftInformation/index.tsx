import { useAlert, useConfirm } from '@boolti/ui';
import Styled from './GiftInformation.styles';
import { ChevronRightIcon } from '@boolti/icon';
import { useParams } from 'react-router-dom';
import { useGift } from '@boolti/api';
import { format } from 'date-fns/format';
import { GiftStatus } from '@boolti/api/src/types/gift';
import { useDeviceWidth } from '~/hooks/useDeviceWidth';
import { useTheme } from '@emotion/react';

const GiftInformation = () => {
  const { giftId = '' } = useParams<{ giftId: string }>();
  const confirm = useConfirm();
  const alert = useAlert();
  const deviceWidth = useDeviceWidth();
  const theme = useTheme();
  const isMobile = deviceWidth < parseInt(theme.breakpoint.mobile, 10);

  const { data } = useGift(giftId);

  const {
    recipientName,
    message,
    showId,
    status,
    giftImageUrl,
    showImageUrl,
    giftExpireDate,
    showName,
  } = data ?? {};

  const isRegistered = status === GiftStatus.REGISTERED;
  const isCancelled = status === GiftStatus.CANCELLED;
  const isRejected = status === GiftStatus.REJECTED;
  const isRegistrable = status === GiftStatus.REGISTRABLE;
  const showDetailLink = `https://boolti.page.link/?link=https://preview.boolti.in/show/${showId}&apn=com.nexters.boolti&ibi=com.nexters.boolti&isi=6476589322`;
  const giftRegisterLink = `https://boolti.page.link/?link=https://app.boolti.in/gift/${giftId}&apn=com.nexters.boolti&ibi=com.nexters.boolti&isi=6476589322`;

  const handleRegister = async () => {
    if (!isMobile) {
      return await alert('불티 앱에서만 이용이 가능합니다. 모바일로 접근해 주세요.');
    }
    const result = await confirm(
      `선물 등록을 위해 불티앱으로 이동할까요?${'\n'}앱이 설치되지 않은 경우 스토어로 이동합니다.`,
      {
        cancel: '취소하기',
        confirm: '이동하기',
      },
    );

    if (result) {
      window.open(giftRegisterLink, '_blank');
    }
  };

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
            <Styled.ShowDetailLink
              onClick={() => {
                window.open(showDetailLink, '_blank');
              }}
            >
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
              {format(giftExpireDate ?? new Date(), 'yyyy년 M월 d일')}
            </Styled.ExpireDate>
            까지 선물을 등록해 주세요
          </Styled.RegisterDescription>
        )}
        <Styled.Button disabled={!isRegistrable} onClick={handleRegister}>
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
