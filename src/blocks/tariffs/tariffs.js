import Swiper from "swiper";
import { Pagination } from "swiper/modules";

(() => {

    const swiper = new Swiper(".tariffs__swiper.swiper", {
        modules: [Pagination],
        slidesPerView: 1.05,
        centeredSlides: true,
        spaceBetween: 8,
        initialSlide: 0,
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
                spaceBetween: 40,
                initialSlide: 2
            }
        }
    });

})();
