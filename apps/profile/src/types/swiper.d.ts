declare module 'swiper/react' {
  import type { ReactNode } from 'react';
  import type { SwiperOptions } from 'swiper/types';

  export interface SwiperProps extends SwiperOptions {
    children?: ReactNode;
    className?: string;
  }

  export interface SwiperSlideProps {
    children?: ReactNode;
    className?: string;
  }

  export const Swiper: React.FC<SwiperProps>;
  export const SwiperSlide: React.FC<SwiperSlideProps>;
}

declare module 'swiper/css';
