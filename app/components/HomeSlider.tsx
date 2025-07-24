"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper Styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "../styles/swiper-slider.css";

import Image from "next/image";

function ChurchBanner() {
  return (
    <Swiper
      spaceBetween={50}
      centeredSlides={true}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      pagination={{
        dynamicBullets: true,
        bulletActiveClass: "swiper-pagination-bullet-active",
        bulletClass: "swiper-pagination-bullet",
      }}
      modules={[Autoplay, Pagination, Navigation]}
      slidesPerView={1}
      navigation
      className="churchBanner relative"
    >
      <SwiperSlide>
        <div className="flex justify-center items-center">
          <Image
            src="/image/church-logo-01.jpeg"
            alt="Church Logo 1"
            width={600}
            height={300}
            className="max-w-[600px] w-full h-auto mx-4 rounded-lg shadow"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex justify-center items-center">
          <Image
            src={"/image/church-logo-02.jpeg"}
            alt="Church Logo 2"
            width={600}
            height={300}
            className="max-w-[600px] w-full h-auto mx-4 rounded-lg shadow"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex justify-center items-center">
          <Image
            src={"/image/church-logo-03.png"}
            alt="Church Logo 3"
            width={600}
            height={300}
            className="max-w-[600px] w-full h-auto mx-4 rounded-lg shadow"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default function HomeSlider() {
  return <ChurchBanner />;
}
