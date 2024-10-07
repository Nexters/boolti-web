import { useRef, useState } from 'react';
import Styled from './Tab.styles';
import 'swiper/css';
import { Swiper, SwiperSlide, SwiperRef, SwiperClass } from 'swiper/react';

interface Props {
  tabItems: Array<{
    title: string;
    content: React.ReactNode;
  }>;
}

const Tab = ({ tabItems }: Props) => {
  const swiperRef = useRef<SwiperRef>(null);
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <Styled.Tab>
        {tabItems.map(({ title }, index) => (
          <Styled.TabButton
            key={index}
            isSelected={tabIndex === index}
            onClick={() => {
              swiperRef.current?.swiper.slideTo(index);
            }}
          >
            {title}
          </Styled.TabButton>
        ))}
      </Styled.Tab>
      <Swiper
        style={{ width: '100%', height: 'auto' }}
        ref={swiperRef}
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={(swiper: SwiperClass) => {
          const activeIndex = swiper.activeIndex;
          setTabIndex(activeIndex);
        }}
      >
        {tabItems.map(({ content }, index) => (
          <SwiperSlide key={index}>{content}</SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Tab;
