import { ShowCastTeamReadResponse, ShowPreviewResponse } from '@boolti/api';
import { BooltiDark, ShareIcon } from '@boolti/icon';
import { Footer, ShowPreview, useDialog } from '@boolti/ui';
import { format, setDefaultOptions } from 'date-fns';
import { ko } from 'date-fns/locale';
import { QRCodeSVG } from 'qrcode.react';
import { useLoaderData } from 'react-router-dom';

import Styled from './ShowPreviewPage.styles';
import { Meta } from '../../components/Meta';
import BooltiGrayLogo from '../../components/BooltiGrayLogo';

setDefaultOptions({ locale: ko });

const ShowPreviewPage = () => {
  const loaderData = useLoaderData() as
    | [ShowPreviewResponse, ShowCastTeamReadResponse[]]
    | undefined;

  const dialog = useDialog();

  if (!loaderData) {
    // window.location.href = 'https://boolti.in';
    return;
  }

  const [previewData, showCastTeams] = loaderData;
  const {
    id,
    name: title,
    notice: text,
    date,
    showImg,
    runningTime,
    salesEndTime,
    salesStartTime,
    placeName,
    streetAddress,
    detailAddress,
    hostName,
    hostPhoneNumber,
  } = previewData;

  const dynamicLink = `https://boolti.page.link/?link=https://preview.boolti.in/show/${id}&apn=com.nexters.boolti&ibi=com.nexters.boolti&isi=6476589322`;

  const shareButtonClickHandler = async () => {
    try {
      await navigator.share({
        title,
        text,
        url: dynamicLink,
      });
    } catch (error) {
      navigator.clipboard.writeText(dynamicLink);

      alert('공연 링크가 복사되었어요');
    }
  };

  const reservationButtonClickHandler = () => {
    dialog.open({
      title: '불티 앱에서 예매하기',
      content: (
        <Styled.DialogContainer>
          <Styled.DialogQRCodeContainer>
            <Styled.QRCodeContainer>
              <QRCodeSVG value={dynamicLink} size={182} level="H" />
            </Styled.QRCodeContainer>
            <BooltiGrayLogo />
          </Styled.DialogQRCodeContainer>
          <Styled.DialogTitle>
            불티 앱에서
            <br />
            핫한 공연을 예매하세요!
          </Styled.DialogTitle>
          <Styled.DialogDescription>
            휴대폰 카메라로 QR코드를 찍어 앱을 다운로드 받아요
          </Styled.DialogDescription>
        </Styled.DialogContainer>
      ),
    });
  };

  const reservationButtonMobileClickHandler = () => {
    window.location.href = dynamicLink;
  };

  return (
    <>
      <Meta title={title} showId={id.toString()} />
      <Styled.ShowPreviewPage>
        <Styled.ShowPreviewContainer>
          <Styled.Header>
            <Styled.HeaderLogoLink href="https://boolti.in">
              <BooltiDark />
            </Styled.HeaderLogoLink>
            <Styled.ShareButton type="button" onClick={shareButtonClickHandler}>
              <ShareIcon />
            </Styled.ShareButton>
          </Styled.Header>
          <ShowPreview
            show={{
              images: showImg.map((file) => file.path),
              name: title,
              date: format(new Date(date), 'yyyy.MM.dd (E)'),
              startTime: format(new Date(date), 'HH:mm'),
              runningTime: runningTime.toString(),
              salesStartTime: format(new Date(salesStartTime), 'yyyy.MM.dd (E)'),
              salesEndTime: format(new Date(salesEndTime), 'yyyy.MM.dd (E)'),
              placeName: placeName,
              placeStreetAddress: streetAddress,
              placeDetailAddress: detailAddress,
              notice: text,
              hostName: hostName,
              hostPhoneNumber: hostPhoneNumber,
            }}
            showCastTeams={showCastTeams.map(({ name, members }) => ({
              name,
              members: members?.map(({ roleName, userNickname, userImgPath }) => ({
                roleName,
                userNickname,
                userImgPath,
              })),
            }))}
            onClickLink={reservationButtonClickHandler}
            onClickLinkMobile={reservationButtonMobileClickHandler}
          />
          <Styled.FooterWrapper>
            <Footer darkMode />
          </Styled.FooterWrapper>
          <Styled.ReservationButtonWrapper>
            <Styled.ReservationButton type="button" onClick={reservationButtonClickHandler}>
              앱에서 예매하기
            </Styled.ReservationButton>
            <Styled.ReservationButtonMobile
              type="button"
              onClick={reservationButtonMobileClickHandler}
            >
              앱에서 예매하기
            </Styled.ReservationButtonMobile>
          </Styled.ReservationButtonWrapper>
        </Styled.ShowPreviewContainer>
      </Styled.ShowPreviewPage>
    </>
  );
};

export default ShowPreviewPage;
