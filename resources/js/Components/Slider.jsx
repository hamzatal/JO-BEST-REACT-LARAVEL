import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Slider = ({ movies, isDarkMode, renderMovieCard }) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            }}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
            }}
            className="w-full overflow-visible modern-slider"
        >
            {movies.map((movie) => (
                <SwiperSlide key={movie.id}>
                    {renderMovieCard(movie)}
                </SwiperSlide>
            ))}

            {/* Custom Navigation Buttons with Red Color */}
            <div className="swiper-button-next text-red-500 after:text-red-500"></div>
            <div className="swiper-button-prev text-red-500 after:text-red-500"></div>
        </Swiper>
    );
};

export default Slider;