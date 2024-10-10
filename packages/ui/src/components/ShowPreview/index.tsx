import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Styled from './ShowPreview.styles';

import Tab from '../Tab';
import ShowCastInfo from './ShowCastInfo';
import ShowInfoDetail from './ShowInfoDetail';
import ShowTicketPeriod from './ShowTicketPeriod';

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
  onClickLink?: () => void;
  onClickLinkMobile?: () => void;
}

const ShowPreview = ({
  show,
  hasNoticePage,
  onClickLink,
  onClickLinkMobile,
  showCastTeams,
}: ShowPreviewProps) => {
  const { images, name, salesStartTime, salesEndTime } = show;

  return (
    <Styled.ShowPreview>
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
        <ShowTicketPeriod salesStartTime={salesStartTime} salesEndTime={salesEndTime} />
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
