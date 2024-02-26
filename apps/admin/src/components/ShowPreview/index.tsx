import 'swiper/css';
import 'swiper/css/pagination';

import React, { useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Styled from './ShowPreview.styles';
import ShowPreviewNotice from './ShowPreviewNotice';

interface ShowPreviewProps {
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
}

const ShowPreview = ({
  images,
  name,
  date,
  startTime,
  runningTime,
  salesStartTime,
  salesEndTime,
  placeName,
  placeStreetAddress,
  placeDetailAddress,
  notice,
  hostName,
  hostPhoneNumber,
}: ShowPreviewProps) => {
  const [noticeOpen, setNoticeOpen] = useState<boolean>(false);

  if (noticeOpen) {
    return (
      <ShowPreviewNotice
        notice={notice}
        onClickBackButton={() => {
          setNoticeOpen(false);
        }}
      />
    );
  }

  return (
    <Styled.ShowPreview>
      <Styled.ShowPreviewHeader>
        <Swiper
          style={{ width: '100%', height: '419px' }}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{
            clickable: false,
            renderBullet: (index: number, className: string) => {
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
        <Styled.ShowPreviewTicketPeriod>
          <Styled.ShowPreviewTicketPeriodBackground>
            <svg
              width="336"
              height="88"
              viewBox="0 0 336 88"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask id="path-1-inside-1_3698_39558" fill="white">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M328 1.5948e-05C332.418 1.5948e-05 336 3.58174 336 8.00002L336 33C330.477 33 326 37.4772 326 43C326 48.5229 330.477 53 336 53L336 80C336 84.4183 332.418 88 328 88L8.00001 88C3.58173 88 -1.73624e-07 84.4183 0 80L1.93562e-05 53C5.52287 53 10 48.7467 10 43.5C10 38.2533 5.52287 34 2.113e-05 34L3.14374e-06 8C3.14374e-06 3.58172 3.58173 -2.14824e-07 8 0L328 1.5948e-05Z"
                />
              </mask>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M328 1.5948e-05C332.418 1.5948e-05 336 3.58174 336 8.00002L336 33C330.477 33 326 37.4772 326 43C326 48.5229 330.477 53 336 53L336 80C336 84.4183 332.418 88 328 88L8.00001 88C3.58173 88 -1.73624e-07 84.4183 0 80L1.93562e-05 53C5.52287 53 10 48.7467 10 43.5C10 38.2533 5.52287 34 2.113e-05 34L3.14374e-06 8C3.14374e-06 3.58172 3.58173 -2.14824e-07 8 0L328 1.5948e-05Z"
                fill="#434753"
              />
              <path
                d="M336 8.00002H335V8.00002L336 8.00002ZM328 1.5948e-05V1.00002V1.5948e-05ZM336 33V34H337V33H336ZM336 53H337V52H336V53ZM336 80H335H336ZM328 88V89V88ZM8.00001 88V87V88ZM0 80H-1H0ZM1.93562e-05 53V52H-0.99998L-0.999981 53H1.93562e-05ZM10 43.5H11H10ZM2.113e-05 34H-0.999979L-0.999978 35H2.113e-05V34ZM3.14374e-06 8H-0.999997V8L3.14374e-06 8ZM8 0V-1V0ZM337 8.00002C337 3.02945 332.971 -0.999984 328 -0.999984V1.00002C331.866 1.00002 335 4.13402 335 8.00002H337ZM337 33L337 8.00001L335 8.00002L335 33L337 33ZM327 43C327 38.0295 331.029 34 336 34V32C329.925 32 325 36.9249 325 43H327ZM336 52C331.029 52 327 47.9706 327 43H325C325 49.0752 329.925 54 336 54V52ZM337 80L337 53H335L335 80H337ZM328 89C332.971 89 337 84.9706 337 80H335C335 83.866 331.866 87 328 87V89ZM8.00001 89L328 89V87L8.00001 87V89ZM-1 80C-1 84.9706 3.02945 89 8.00001 89V87C4.13402 87 1 83.866 1 80H-1ZM-0.999981 53L-1 80H1L1.00002 53H-0.999981ZM9.00002 43.5C9.00002 48.1467 5.01954 52 1.93562e-05 52V54C6.0262 54 11 49.3467 11 43.5H9.00002ZM2.113e-05 35C5.01954 35 9.00002 38.8533 9.00002 43.5H11C11 37.6533 6.0262 33 2.113e-05 33V35ZM-0.999997 8L-0.999979 34H1.00002L1 8L-0.999997 8ZM8 -1C3.02944 -1 -0.999997 3.02944 -0.999997 8H1C1 4.13401 4.13401 1 8 1V-1ZM328 -0.999984L8 -1V1L328 1.00002V-0.999984Z"
                fill="url(#paint0_linear_3698_39558)"
                mask="url(#path-1-inside-1_3698_39558)"
              />
              <circle cx="108" cy="23" r="2.5" fill="#A2A5B4" />
              티켓 예매 기간
              <circle cx="228" cy="23" r="2.5" fill="#A2A5B4" />
              <path d="M322 44L14 44" stroke="black" strokeDasharray="6 6" />
              <defs>
                <linearGradient
                  id="paint0_linear_3698_39558"
                  x1="45.844"
                  y1="-3.5517e-06"
                  x2="92.2018"
                  y2="124.769"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#DBCBCB" />
                  <stop offset="0.52" stopColor="#4E4E4E" stopOpacity="0" />
                  <stop offset="1" stopColor="#C2C2C2" stopOpacity="0.653846" />
                </linearGradient>
              </defs>
            </svg>
          </Styled.ShowPreviewTicketPeriodBackground>
          <Styled.ShowPreviewTicketPeriodInfo>
            <Styled.ShowPreviewTicketPeriodTitle>
              티켓 예매 기간
            </Styled.ShowPreviewTicketPeriodTitle>
            <Styled.ShowPreviewTicketPeriodText>
              {salesStartTime} - {salesEndTime}
            </Styled.ShowPreviewTicketPeriodText>
          </Styled.ShowPreviewTicketPeriodInfo>
        </Styled.ShowPreviewTicketPeriod>
        <Styled.ShowInfo>
          <Styled.ShowInfoGroup>
            <Styled.ShowInfoTitleContainer>
              <Styled.ShowInfoTitle>일시</Styled.ShowInfoTitle>
            </Styled.ShowInfoTitleContainer>
            <Styled.ShowInfoDescription>
              {date} / {startTime} ({runningTime}분)
            </Styled.ShowInfoDescription>
          </Styled.ShowInfoGroup>
          <Styled.ShowInfoGroup>
            <Styled.ShowInfoTitleContainer>
              <Styled.ShowInfoTitle>장소</Styled.ShowInfoTitle>
              <Styled.ShowInfoTitleButton type="button">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_3914_12951)">
                    <path
                      d="M11.666 4.66602H5.83268C5.18835 4.66602 4.66602 5.18835 4.66602 5.83268V11.666C4.66602 12.3103 5.18835 12.8327 5.83268 12.8327H11.666C12.3103 12.8327 12.8327 12.3103 12.8327 11.666V5.83268C12.8327 5.18835 12.3103 4.66602 11.666 4.66602Z"
                      stroke="#6F7485"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.33268 9.33268C1.69102 9.33268 1.16602 8.80768 1.16602 8.16602V2.33268C1.16602 1.69102 1.69102 1.16602 2.33268 1.16602H8.16602C8.80768 1.16602 9.33268 1.69102 9.33268 2.33268"
                      stroke="#6F7485"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3914_12951">
                      <rect width="14" height="14" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                주소복사
              </Styled.ShowInfoTitleButton>
            </Styled.ShowInfoTitleContainer>
            <Styled.ShowInfoSubtitle>{placeName}</Styled.ShowInfoSubtitle>
            <Styled.ShowInfoDescription>
              {placeStreetAddress} / {placeDetailAddress}
            </Styled.ShowInfoDescription>
          </Styled.ShowInfoGroup>
          <Styled.ShowInfoGroup>
            <Styled.ShowInfoTitleContainer>
              <Styled.ShowInfoTitle>공연 내용</Styled.ShowInfoTitle>
              <Styled.ShowInfoTitleTextButton
                type="button"
                onClick={() => {
                  setNoticeOpen(true);
                }}
              >
                전체보기
              </Styled.ShowInfoTitleTextButton>
            </Styled.ShowInfoTitleContainer>
            <Styled.ShowInfoDescription>
              {notice.split('\n').map((text, index) => (
                <React.Fragment key={`${text}_${index}`}>
                  {text}
                  <br />
                </React.Fragment>
              ))}
            </Styled.ShowInfoDescription>
          </Styled.ShowInfoGroup>
          <Styled.ShowInfoGroup>
            <Styled.ShowInfoTitleContainer>
              <Styled.ShowInfoTitle>주최자</Styled.ShowInfoTitle>
            </Styled.ShowInfoTitleContainer>
            <Styled.ShowInfoBox>
              {hostName} ({hostPhoneNumber})
            </Styled.ShowInfoBox>
          </Styled.ShowInfoGroup>
        </Styled.ShowInfo>
      </Styled.ShowPreviewContent>
    </Styled.ShowPreview>
  );
};

export default ShowPreview;
