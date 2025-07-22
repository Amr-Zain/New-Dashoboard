"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  Grid,
  EffectCoverflow,
} from "swiper/modules";
import CustomNavigation from "./CustomNavigation";
import React, { ReactNode, useRef } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import 'swiper/css/grid';
import "swiper/css/effect-coverflow";

import "@/styles/components/slider.scss";

interface GeneralSliderProps {
  children: ReactNode;
  className?: string;
  extraSettings?: any;
  onFlickityLoad?: any;
  slideClass?: string;
  onSwiperSlideChange?: (activeIndex: number) => void;
  showCustomArrows?: boolean;
  hideArrows?: boolean;
  withPagination?: boolean;
  swiperClassName?: string;
}

const GeneralSlider: React.FC<GeneralSliderProps> = ({
  children,
  className,
  extraSettings,
  hideArrows,
  slideClass,
  onSwiperSlideChange,
  showCustomArrows,
  withPagination = false,
  swiperClassName,
}) => {
  const swiperRef = useRef<any | null>(null);
  const options: any = {
    spaceBetween: 0,
    loop: true,
    slidesPerView: "auto",
    ...extraSettings,
    navigation: {
      enabled: true,
    },
  };
  

  const handleSlideChange = (swiper: any) => {
    if (onSwiperSlideChange) {
      onSwiperSlideChange(swiper.activeIndex || 0);
    }
  };

  return (
    <div className={`relative w-full ${hideArrows ? "hide-arrows" : ""} ${className || "" }`} >
      <Swiper
        ref={swiperRef}
        className={swiperClassName || ""}
        modules={[Navigation, Pagination, Autoplay, Grid, EffectCoverflow]}
        {...options}
        onSlideChange={handleSlideChange}
        pagination={withPagination ? { clickable: true } : undefined}
        onBeforeInit={(swiper) =>swiperRef.current = swiper}
      >
        {React.Children?.map(children, (child, index) => (
          <SwiperSlide className={slideClass} key={`slider_${index}`}>
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
      {showCustomArrows && <CustomNavigation swiperRef={swiperRef} />}
    </div>
  );
};

export default GeneralSlider;
