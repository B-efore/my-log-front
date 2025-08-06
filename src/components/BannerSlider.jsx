import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { getDefaultImage } from "../util/get-images";

const BannerSlider = () => {
  const images = [
    getDefaultImage(),
    getDefaultImage(),
  ];

  return (
    <div className="w-[90%] mx-auto h-48 sm:h-48 overflow-hidden round-box-border">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={src}
              alt={`배너 ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;