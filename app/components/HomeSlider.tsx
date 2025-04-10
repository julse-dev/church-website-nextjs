"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper Styles
import "swiper/css";
import "swiper/css/pagination";

// Import required modules
import { Autoplay, Pagination } from "swiper/modules";

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
      modules={[Autoplay, Pagination]}
      slidesPerView={1}
      className="churchBanner"
    >
      <SwiperSlide>
        {/* <img src="/image/church-logo-01.jpeg" alt="Church Logo 1" className="w-full h-auto" /> */}
        <Image
          src="/image/church-logo-01.jpeg"
          alt="Church Logo 1"
          width={500}
          height={300}
          className="w-full h-auto"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={"/image/church-logo-02.jpeg"}
          alt="Church Logo 2"
          width={500}
          height={300}
          className="w-full h-auto"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={"/image/church-logo-03.png"}
          alt="Church Logo 3"
          width={500}
          height={300}
          className="w-full h-auto"
        />
      </SwiperSlide>
    </Swiper>
  );
}

export default function HomeSlider() {
  return <ChurchBanner />;
}
