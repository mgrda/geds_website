/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'swiper/react' {
    import { FunctionComponent, ReactNode, RefAttributes } from 'react';
    import { SwiperOptions } from 'swiper/types';

    export interface SwiperProps extends SwiperOptions, RefAttributes<any> {
        children?: ReactNode;
        modules?: any[];
        className?: string;
        tag?: string;
        onSwiper?: (swiper: any) => void;
        onSlideChange?: (swiper: any) => void;
        // Add other props as strictly or loosely as needed
        [key: string]: any;
    }

    export interface SwiperSlideProps {
        children?: ReactNode;
        className?: string;
        tag?: string;
        virtualIndex?: number;
        zoom?: boolean;
        [key: string]: any;
    }

    export const Swiper: FunctionComponent<SwiperProps>;
    export const SwiperSlide: FunctionComponent<SwiperSlideProps>;
}

declare module 'swiper/modules' {
    export const Autoplay: any;
    export const Pagination: any;
    export const Navigation: any;
    export const Grid: any;
    export const Manipulation: any;
    export const Virtual: any;
    export const Keyboard: any;
    export const Mousewheel: any;
    export const Parallax: any;
    export const Scrollbar: any;
    export const A11y: any;
    export const History: any;
    export const HashNavigation: any;
    export const EffectFade: any;
    export const EffectCube: any;
    export const EffectFlip: any;
    export const EffectCoverflow: any;
    export const EffectCards: any;
    export const EffectCreative: any;
    export const Thumbs: any;
    export const Zoom: any;
    export const FreeMode: any;
    export const Controller: any;
}

declare module 'swiper/css' { }
declare module 'swiper/css/*' { }
