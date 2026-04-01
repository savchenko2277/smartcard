import Swiper from "swiper";
import { Pagination } from "swiper/modules";
import { Navigation } from "swiper/modules";

(() => {

    const swiper = new Swiper(".tariffs__swiper.swiper", {
        modules: [Pagination, Navigation],
        slidesPerView: 1.05,
        centeredSlides: true,
        spaceBetween: 8,
        initialSlide: 0,
        loop: false,
        navigation: {
            nextEl: document.querySelector('.tariffs__navigation-btn_next'),
            prevEl: document.querySelector('.tariffs__navigation-btn_prev'),
        },
        pagination: {
            el: ".custom-pagination",
            clickable: true,
        },

        breakpoints: {
            640: {
                slidesPerView: 2,
                initialSlide: 2,
            },
            1100: {
                slidesPerView: 3.1,
                spaceBetween: 24,
                initialSlide: 2
            }
        }
    });

})();
