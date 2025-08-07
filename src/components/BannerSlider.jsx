import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import test from "./../../public/home-bg.png"

import "swiper/css";
import "swiper/css/pagination";

const BannerSlider = () => {
  const images = [
    test,
  ];

  return (
    <div className="w-full mx-auto overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        // pagination={{ clickable: true }}
        className="w-full h-full"
      >

        {images.map((src, idx) => (
        <SwiperSlide>
          <img
              src={src}
              alt={`배너 ${idx + 1}`}
              className="w-fit h-fit"
            />
        </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;