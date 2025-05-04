import 'swiper/css';
import 'swiper/css/pagination';

import { useEffect, useRef, useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BooltiDark, ClockMobileIcon, MapMarkerIcon, ShareIcon } from '@boolti/icon';

import Styled from './ShowPreview.styles';
import Tab from '../Tab';
import ShowCastInfo from './ShowCastInfo';
import ShowInfoDetail from './ShowInfoDetail';
import ShowPreviewNotice from './ShowPreviewNotice';

interface ShowPreviewProps {
  show: {
    images: string[];
    name: string;
    date: string;
    startTime: string;
    runningTime: string;
    salesStartTime: string;
    salesEndTime: string;
    placeName: string;
    streetAddress: string;
    detailAddress: string;
    notice: string;
    hostName: string;
    hostPhoneNumber: string;
    latitude?: number;
    longitude?: number;
  };
  showCastTeams: Array<{
    name: string;
    members?: {
      roleName: string;
      userNickname: string;
      userImgPath: string;
    }[];
  }>;
  shareDropdownOpen?: boolean;
  logoLinkHref?: string;
  containerRef?: React.RefObject<HTMLDivElement>;
  onClickLink?: () => void;
  onClickLinkMobile?: () => void;
  onClickShareButton?: () => void;
  onShareShowPreviewLink?: () => void;
  onShareShowInfo?: () => void;
  onCloseShareDropdown?: () => void;
}

const ShowPreview = ({
  show,
  showCastTeams,
  shareDropdownOpen,
  logoLinkHref,
  containerRef,
  onClickLink,
  onClickLinkMobile,
  onClickShareButton,
  onShareShowPreviewLink,
  onShareShowInfo,
  onCloseShareDropdown,
}: ShowPreviewProps) => {
  const { images, name, date, startTime, runningTime, placeName } = show;

  const [noticeOpen, setNoticeOpen] = useState<boolean>(false);
  const containerScrollTop = useRef<number | null>(null);
  const shareDropdownMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outsideClickHandler = (event: MouseEvent) => {
      if (
        shareDropdownOpen &&
        !shareDropdownMenuRef.current?.contains(event.target as HTMLElement)
      ) {
        onCloseShareDropdown?.();
      }
    };

    document.addEventListener('click', outsideClickHandler);

    return () => {
      document.removeEventListener('click', outsideClickHandler);
    };
  }, [onCloseShareDropdown, shareDropdownOpen]);

  if (noticeOpen) {
    return (
      <ShowPreviewNotice
        notice={show.notice}
        onClickBackButton={() => {
          if (containerScrollTop.current !== null) {
            containerRef?.current?.scrollTo(0, containerScrollTop.current);
            containerScrollTop.current = null;
          }

          setNoticeOpen(false);
        }}
      />
    );
  }

  return (
    <Styled.ShowPreview>
      <Styled.ShowPreviewNavbar>
        <Styled.LogoLink href={logoLinkHref}>
          <BooltiDark />
        </Styled.LogoLink>
        <Styled.ShareButton
          onClick={(event) => {
            event.stopPropagation();
            onClickShareButton?.();
          }}
          disabled={!onClickShareButton}
        >
          <ShareIcon />
        </Styled.ShareButton>
        <Styled.ShareDropdownMenu ref={shareDropdownMenuRef} open={!!shareDropdownOpen}>
          <Styled.ShareDropdownItem
            onClick={() => {
              onShareShowPreviewLink?.();
            }}
          >
            URL만 공유하기
          </Styled.ShareDropdownItem>
          <Styled.ShareDropdownItem
            onClick={() => {
              onShareShowInfo?.();
            }}
          >공연 정보 함께 공유하기</Styled.ShareDropdownItem>
        </Styled.ShareDropdownMenu>
      </Styled.ShowPreviewNavbar>
      <Styled.ShowPreviewHeader>
        <Swiper
          style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{
            clickable: false,
            renderBullet: (_: number, className: string) => {
              return '<span class="' + className + '"></span>';
            },
          }}
          modules={[Pagination]}
        >
          {images.map((image) => (
            <SwiperSlide key={image}>
              <Styled.ShowImage src={image} alt={name} />
            </SwiperSlide>
          ))}
        </Swiper>
        <Styled.ShowName>{name}</Styled.ShowName>
        <Styled.ShowHeaderInfoList>
          <Styled.ShowHeaderInfoItem>
            <ClockMobileIcon />
            <span>
              {date} / {startTime}
            </span>
            <Styled.ShowInfoDescriptionBadge>{runningTime}분</Styled.ShowInfoDescriptionBadge>
          </Styled.ShowHeaderInfoItem>
          <Styled.ShowHeaderInfoItem>
            <MapMarkerIcon />
            <span>{placeName}</span>
          </Styled.ShowHeaderInfoItem>
        </Styled.ShowHeaderInfoList>
      </Styled.ShowPreviewHeader>
      <Styled.ShowPreviewContent>
        <Tab
          tabItems={[
            {
              title: '공연 정보',
              content: (
                <ShowInfoDetail
                  show={show}
                  onClickCallLink={onClickLink}
                  onClickMessageLink={onClickLink}
                  onClickCallLinkMobile={onClickLinkMobile}
                  onClickMessageLinkMobile={onClickLinkMobile}
                />
              ),
            },
            {
              title: '출연진',
              content: <ShowCastInfo showCastTeams={showCastTeams} />,
            },
          ]}
        />
      </Styled.ShowPreviewContent>
    </Styled.ShowPreview>
  );
};

export default ShowPreview;
