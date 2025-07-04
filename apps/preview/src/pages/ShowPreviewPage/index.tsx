import { ShowCastTeamReadResponse, ShowPreviewResponse } from '@boolti/api';
import { Footer, ShowPreview, useDeviceByWidth, useDialog } from '@boolti/ui';
import { format, setDefaultOptions } from 'date-fns';
import { ko } from 'date-fns/locale';
import { QRCodeSVG } from 'qrcode.react';
import { useLoaderData } from 'react-router-dom';

import Styled from './ShowPreviewPage.styles';
import { Meta } from '../../components/Meta';
import BooltiGrayLogo from '../../components/BooltiGrayLogo';
import useBodyScrollLock from '../../hooks/useBodyScrollLock';
import { useState } from 'react';

setDefaultOptions({ locale: ko });

const getDynamicLink = (showId: number) => {
  return `https://boolti.page.link/?link=https://preview.boolti.in/show/${showId}&apn=com.nexters.boolti&ibi=com.nexters.boolti&isi=6476589322`;
};

const getPreviewLink = (showId: number) => {
  return `${window.location.origin}/show/${showId}`;
};

const getShareText = (show: {
  id: number;
  title: string;
  date: Date;
  placeName: string;
  streetAddress: string;
  detailAddress: string;
}) => {
  return (
    '공연 정보를 공유드려요!\n' +
    '\n' +
    `- 공연명 : ${show.title}\n` +
    `- 일시 : ${format(show.date, 'yyyy.MM.dd (E) / HH:mm -', { locale: ko })}\n` +
    `- 장소 : ${show.placeName} / ${show.streetAddress}, ${show.detailAddress}\n` +
    '\n' +
    '공연 상세 정보 ▼\n' +
    `${getPreviewLink(show.id)}`
  );
};

const ShowPreviewPage = () => {
  const [shareDialogOpen, setShareDialogOpen] = useState<boolean>(false);
  const [shareDropdownOpen, setShareDropdownOpen] = useState<boolean>(false);

  const loaderData = useLoaderData() as
    | [ShowPreviewResponse, ShowCastTeamReadResponse[]]
    | undefined;

  const dialog = useDialog();
  const { device } = useDeviceByWidth({
    onChangeDeviceByWidth: () => {
      setShareDialogOpen(false);
      setShareDropdownOpen(false);
      dialog.close();
    },
  });

  useBodyScrollLock(shareDialogOpen);

  if (!loaderData) {
    window.location.href = 'https://boolti.in';
    return;
  }

  const [previewData, showCastTeams = []] = loaderData;
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
    latitude,
    longitude,
  } = previewData;

  const shareShowPreviewLink = async () => {
    const text = getPreviewLink(id);

    if (navigator.share) {
      await navigator.share({ text });
    } else {
      await navigator.clipboard.writeText(text);
      alert('공연 링크가 복사되었어요');
    }
  };

  const shareShowInfo = async () => {
    const text = getShareText({
      id,
      title,
      date: new Date(date),
      placeName,
      streetAddress,
      detailAddress,
    });

    if (navigator.share) {
      await navigator.share({ text });
    } else {
      await navigator.clipboard.writeText(text);
      alert('공연 링크가 복사되었어요');
    }
  };

  const shareButtonClickHandler = () => {
    if (device === 'mobile') {
      dialog.open({
        content: (
          <Styled.ShareBottomSheet>
            <Styled.ShareBottomSheetButton type="button" onClick={shareShowPreviewLink}>
              URL만 공유하기
            </Styled.ShareBottomSheetButton>
            <Styled.ShareBottomSheetButton type="button" onClick={shareShowInfo}>
              공연 정보 함께 공유하기
            </Styled.ShareBottomSheetButton>
          </Styled.ShareBottomSheet>
        ),
        isAuto: true,
        mobileType: 'darkBottomSheet',
        onClose: () => {
          setShareDialogOpen(false);
          setShareDropdownOpen(false);
        },
      });

      setShareDialogOpen(true);
      return;
    }

    setShareDropdownOpen(true);
  };

  const reservationButtonClickHandler = () => {
    dialog.open({
      title: '불티 앱에서 예매하기',
      content: (
        <Styled.DialogContainer>
          <Styled.DialogQRCodeContainer>
            <Styled.QRCodeContainer>
              <QRCodeSVG value={getPreviewLink(id)} size={182} level="H" />
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

  const shareDropdownCloseHandler = () => {
    setShareDialogOpen(false);
    setShareDropdownOpen(false);
    dialog.close();
  };

  const reservationButtonMobileClickHandler = () => {
    window.location.href = getDynamicLink(id);
  };

  return (
    <>
      <Meta title={title} showId={id.toString()} />
      <Styled.ShowPreviewPage>
        <Styled.ShowPreviewContainer>
          <ShowPreview
            show={{
              images: showImg.map((file) => file.path),
              name: title,
              date: format(new Date(date), 'yyyy.MM.dd (E)'),
              startTime: format(new Date(date), 'HH:mm'),
              runningTime: runningTime.toString(),
              salesStartTime: salesStartTime && format(new Date(salesStartTime), 'yyyy.MM.dd (E)'),
              salesEndTime: salesEndTime && format(new Date(salesEndTime), 'yyyy.MM.dd (E)'),
              placeName: placeName,
              streetAddress,
              detailAddress,
              latitude,
              longitude,
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
            shareDropdownOpen={shareDropdownOpen}
            logoLinkHref="https://boolti.in"
            onClickLink={reservationButtonClickHandler}
            onClickLinkMobile={reservationButtonMobileClickHandler}
            onClickShareButton={shareButtonClickHandler}
            onShareShowPreviewLink={shareShowPreviewLink}
            onShareShowInfo={shareShowInfo}
            onCloseShareDropdown={shareDropdownCloseHandler}
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
