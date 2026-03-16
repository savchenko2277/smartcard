import Swiper from "swiper";
import { Navigation } from "swiper/modules";

(() => {

    const swiper = new Swiper('.reviews__swiper.swiper', {
        modules: [Navigation],
        slidesPerView: 1.05,
        spaceBetween: 12,
        centeredSlides: true,
        initialSlide: 1,
        loop: true,
        navigation: {
            nextEl: document.querySelector('.custom-navigation__btn_next'),
            prevEl: document.querySelector('.custom-navigation__btn_prev'),
        },

        breakpoints: {
            960: {
                slidesPerView: 2,
                spaceBetween: 40,
                centeredSlides: false
            }
        }
    });

})();
