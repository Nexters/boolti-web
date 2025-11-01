declare module 'swiper/react' {
  import type {
    CSSProperties,
    ForwardRefExoticComponent,
    ReactNode,
    RefAttributes,
  } from 'react';

  export interface SwiperInstance {
    activeIndex: number;
    update: () => void;
    slideTo: (index: number, speed?: number, runCallbacks?: boolean) => void;
  }

  export interface SwiperRef {
    swiper?: SwiperInstance;
  }

  export type SwiperClass = SwiperInstance;

  export interface SwiperProps {
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    autoHeight?: boolean;
    spaceBetween?: number;
    slidesPerView?: number | 'auto';
    pagination?: unknown;
    modules?: unknown[];
    onSlideChange?: (swiper: SwiperInstance) => void;
  }

  export interface SwiperSlideProps {
    children?: ReactNode;
    className?: string;
  }

  export const Swiper: ForwardRefExoticComponent<SwiperProps & RefAttributes<SwiperRef>>;
  export const SwiperSlide: React.FC<SwiperSlideProps>;

  export function useSwiper(): SwiperInstance | undefined;
}

declare module 'swiper/css';
declare module 'swiper/css/pagination';
