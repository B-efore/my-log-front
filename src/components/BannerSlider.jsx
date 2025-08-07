import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import test from "./../../public/home-bg.png"

import "swiper/css";
import "swiper/css/pagination";

const BannerSlider = () => {
  const images = [
    test,
    test
  ];

  return (
    <div className="w-full mx-auto h-48 sm:h-48 overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        // pagination={{ clickable: true }}
        className="w-full h-full"
      >

        {/* {images.map((src, idx) => ( */}
        <SwiperSlide>
          {/* <img
              src={src}
              alt={`배너 ${idx + 1}`}
              className="w-full h-full object-cover"
            /> */}
          <p className="px-4 font-orbit">
            외계인 이곳에 존재하다. 준비 중 . . .
          </p>
        </SwiperSlide>

      </Swiper>
    </div>
  );
};

export default BannerSlider;