import { useShowPreview } from '@boolti/api';
import { ShareIcon } from '@boolti/icon';
import { ShowPreview, useDialog } from '@boolti/ui';
import { format, setDefaultOptions } from 'date-fns';
import { ko } from 'date-fns/locale';
import { QRCodeSVG } from 'qrcode.react';
import { Helmet } from 'react-helmet';
import { Navigate, useParams } from 'react-router-dom';

import Styled from './ShowPreviewPage.styles';

setDefaultOptions({ locale: ko });

const BooltiGrayLogo = () => (
  <svg width="71" height="26" viewBox="0 0 71 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M52.2852 3.87972C52.2852 3.53484 52.5523 3.2666 52.8861 3.2666H54.6986C55.0325 3.2666 55.2996 3.53484 55.2996 3.87014V22.1106C55.2996 22.4459 55.0325 22.7237 54.6986 22.7237H52.8861C52.5523 22.7237 52.2852 22.4554 52.2852 22.1106V3.87972Z"
      fill="#888D9D"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M43.2043 3.2666C42.8704 3.2666 42.5938 3.53484 42.5938 3.87014V22.1106C42.5938 22.4459 42.8608 22.7237 43.2043 22.7237H50.4732C50.807 22.7237 51.0837 22.4554 51.0837 22.1106V20.8939C51.0837 20.5586 50.8166 20.2808 50.4732 20.2808H45.6272V14.1974H49.8626C50.1965 14.1974 50.4732 13.9292 50.4732 13.5939V12.3772C50.4732 12.0419 50.2061 11.7737 49.8626 11.7737H45.6272V5.69993H50.4732C50.807 5.69993 51.0837 5.43169 51.0837 5.08681V3.87972C51.0741 3.53484 50.7975 3.2666 50.4636 3.2666H43.1947H43.2043Z"
      fill="#888D9D"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M39.8849 15.7305C40.1425 15.7305 40.3714 15.8933 40.4573 16.1328C40.4764 16.1903 40.4954 16.2574 40.4954 16.334V17.5507C40.4954 17.5986 40.4954 17.6369 40.4859 17.6656C40.4382 17.9722 40.1997 18.2692 39.9135 18.365L34.4189 20.2906H39.8849C40.2188 20.2906 40.4954 20.5588 40.4954 20.9037V22.1204C40.4954 22.4557 40.2283 22.7335 39.8849 22.7335H28.0754C27.8178 22.7335 27.5984 22.5706 27.5125 22.3503C27.4839 22.2928 27.4744 22.2162 27.4744 22.1395V20.9229C27.4744 20.8654 27.4744 20.8271 27.4839 20.7887C27.5412 20.4918 27.7701 20.2044 28.0467 20.1086L33.5509 18.183H28.0754C27.7415 18.183 27.4648 17.9147 27.4648 17.5698V16.3532C27.4648 16.0179 27.7319 15.74 28.0754 15.74H39.8849V15.7305Z"
      fill="#888D9D"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M28.0736 3.2666C27.7398 3.2666 27.4727 3.53484 27.4727 3.87972V10.8732C27.4727 11.2085 27.7398 11.4767 28.0832 11.4767H39.8927C40.2266 11.4767 40.5033 11.2085 40.5033 10.8732V3.87014C40.5033 3.53484 40.2362 3.2666 39.8927 3.2666H38.0803C37.7464 3.2666 37.4698 3.53484 37.4698 3.87014V5.69035H30.5061V3.87972C30.4966 3.53484 30.2295 3.2666 29.8956 3.2666H28.0832H28.0736ZM37.4602 8.13327H30.4966V9.04337H37.4602V8.13327Z"
      fill="#888D9D"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M40.4954 13C40.4954 12.6647 40.2283 12.3965 39.8849 12.3965H28.0754C27.7415 12.3965 27.4648 12.6647 27.4648 13V14.2167C27.4648 14.552 27.7319 14.8202 28.0754 14.8202H32.3108V15.7303H35.64V14.8202H39.8754C40.2093 14.8202 40.4859 14.552 40.4859 14.2167V13H40.4954Z"
      fill="#888D9D"
    />
    <path
      d="M23.4951 11.6169L16.1264 4.20601C15.532 3.60821 14.7206 3.2666 13.8714 3.2666H6.64426C6.18194 3.2666 5.74794 3.44689 5.41771 3.77901L4.85162 4.34835C4.53083 4.66148 4.35156 5.10747 4.35156 5.57243V12.841C4.35156 13.695 4.69122 14.5111 5.28562 15.1089L12.4562 22.3205C13.0034 22.8709 13.8997 22.8709 14.4564 22.3205L17.702 19.0563C17.3529 18.6957 17.1642 18.1833 17.2586 17.614C17.3812 16.9308 17.9473 16.3899 18.6266 16.314C19.306 16.2381 19.6268 16.4373 19.9664 16.7789L23.4856 13.2395C23.9291 12.7935 23.9291 12.0724 23.4856 11.6264L23.4951 11.6169ZM14.9281 12.7271C14.7866 13.0308 14.5885 13.2775 14.3526 13.4768C14.0979 13.676 13.8148 13.8184 13.4846 13.9038C13.1544 13.9892 12.8053 14.0366 12.4279 14.0366H7.6538C7.04052 14.0366 6.54047 13.5337 6.54047 12.9169V6.50235C6.54047 5.88556 7.04052 5.38265 7.6538 5.38265H11.975C12.3524 5.38265 12.7015 5.43009 13.0317 5.48703C13.3619 5.57243 13.645 5.70527 13.8997 5.87607C14.1356 6.06585 14.3337 6.30308 14.4753 6.57826C14.6168 6.87242 14.6828 7.233 14.6828 7.66C14.6828 8.08701 14.5979 8.40964 14.4564 8.72277C14.296 9.0454 14.0413 9.33007 13.7205 9.5578C13.9092 9.63371 14.0979 9.7286 14.2677 9.84247C14.4281 9.96583 14.5696 10.0987 14.7111 10.2695C14.8244 10.4403 14.9376 10.6395 15.0131 10.8578C15.0791 11.0855 15.1168 11.3322 15.1168 11.6169C15.1168 12.0534 15.0508 12.4235 14.9093 12.7271H14.9281Z"
      fill="#888D9D"
    />
  </svg>
);

const ShowPreviewPage = () => {
  const params = useParams<{ showId: string }>();
  const { data } = useShowPreview(Number(params.showId));
  const dialog = useDialog();

  const dynamicLink = `https://boolti.page.link/?link=https://preview.boolti.in/show/${params.showId}&apn=com.nexters.boolti&ibi=com.nexters.boolti&isi=6476589322`;

  if (params === undefined || Number.isNaN(Number(params.showId))) {
    return <Navigate to="https://boolti.in" replace />;
  }

  const shareButtonClickHandler = async () => {
    try {
      await navigator.share({
        title: data?.name ?? '',
        text: data?.notice ?? '',
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
      <Helmet>
        <meta
          name="description"
          content="핫한 공연 예매의 시작, 불티 지금 티켓을 구매하고 공연을 즐겨보세요."
        />
        <meta
          property="og:title"
          content={data?.name ? `${data.name} - 불티` : '손쉬운 예매 빠른 입장은 불티'}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="손쉬운 예매 빠른 입장은 불티" />
        <meta
          name="og:description"
          content="핫한 공연 예매의 시작, 불티 지금 티켓을 구매하고 공연을 즐겨보세요."
        />
        <meta property="og:url" content="https://boolti.in/" />
        <meta property="og:image" content="https://boolti.in/thumbnail.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="600" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="boolti.in" />
        <meta property="twitter:url" content="https://boolti.in/" />
        <meta
          name="twitter:title"
          content={data?.name ? `${data.name} - 불티` : '손쉬운 예매 빠른 입장은 불티'}
        />
        <meta
          name="twitter:description"
          content="핫한 공연 예매의 시작, 불티 지금 티켓을 구매하고 공연을 즐겨보세요."
        />
        <meta name="twitter:image" content="/thumbnail.png" />
        <link rel="canonical" href="https://boolti.in/" />
        <title>{data?.name ? `${data.name} - 불티` : '손쉬운 예매 빠른 입장은 불티'}</title>
      </Helmet>
      <Styled.ShowPreviewPage>
        <Styled.ShowPreviewContainer>
          <Styled.Header>
            <Styled.ShareButton type="button" onClick={shareButtonClickHandler}>
              <ShareIcon />
            </Styled.ShareButton>
          </Styled.Header>
          <ShowPreview
            show={{
              images: data?.showImg.map((file) => file.path) ?? [],
              name: data?.name ?? '',
              date: data?.date ? format(new Date(data.date), 'yyyy.MM.dd (E)') : '',
              startTime: data?.date ? format(new Date(data.date), 'HH:mm') : '',
              runningTime: data?.runningTime ? `${data.runningTime}` : '',
              salesStartTime: data?.salesStartTime
                ? format(new Date(data.salesStartTime), 'yyyy.MM.dd (E)')
                : '',
              salesEndTime: data?.salesEndTime
                ? format(new Date(data.salesEndTime), 'yyyy.MM.dd (E)')
                : '',
              placeName: data?.placeName ?? '',
              placeStreetAddress: data?.streetAddress ?? '',
              placeDetailAddress: data?.detailAddress ?? '',
              notice: data?.notice ?? '',
              hostName: data?.hostName ?? '',
              hostPhoneNumber: data?.hostPhoneNumber ?? '',
            }}
          />
          <Styled.Footer>
            <Styled.ReservationButton type="button" onClick={reservationButtonClickHandler}>
              예매하기
            </Styled.ReservationButton>
            <Styled.ReservationButtonMobile
              type="button"
              onClick={reservationButtonMobileClickHandler}
            >
              예매하기
            </Styled.ReservationButtonMobile>
          </Styled.Footer>
        </Styled.ShowPreviewContainer>
      </Styled.ShowPreviewPage>
    </>
  );
};

export default ShowPreviewPage;
