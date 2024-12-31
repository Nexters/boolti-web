import 'swiper/css';
import 'swiper/css/pagination';

import { useRef, useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BooltiDark, ShareIcon } from '@boolti/icon';

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
    placeStreetAddress: string;
    placeDetailAddress: string;
    notice: string;
    hostName: string;
    hostPhoneNumber: string;
  };
  showCastTeams: Array<{
    name: string;
    members?: {
      roleName: string;
      userNickname: string;
      userImgPath: string;
    }[];
  }>;
  hasNoticePage?: boolean;
  logoLinkHref?: string;
  containerRef?: React.RefObject<HTMLDivElement>;
  onClickLink?: () => void;
  onClickLinkMobile?: () => void;
  onClickShareButton?: () => void;
}

const ShowPreview = ({
  show,
  showCastTeams,
  hasNoticePage,
  logoLinkHref,
  containerRef,
  onClickLink,
  onClickLinkMobile,
  onClickShareButton,
}: ShowPreviewProps) => {
  const { images, name } = show;

  const [noticeOpen, setNoticeOpen] = useState<boolean>(false);
  const containerScrollTop = useRef<number | null>(null);

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
        <Styled.ShareButton onClick={onClickShareButton} disabled={!onClickShareButton}>
          <ShareIcon />
        </Styled.ShareButton>
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
      </Styled.ShowPreviewHeader>
      <Styled.ShowPreviewContent>
        <Tab
          tabItems={[
            {
              title: '공연 정보',
              content: (
                <ShowInfoDetail
                  show={show}
                  hasNoticePage={hasNoticePage}
                  onClickLink={onClickLink}
                  onClickLinkMobile={onClickLinkMobile}
                  onClickViewNotice={() => {
                    containerScrollTop.current = containerRef?.current?.scrollTop ?? null;
                    containerRef?.current?.scrollTo(0, 0);
                    setNoticeOpen(true);
                  }}
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
