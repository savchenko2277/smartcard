import Swiper from "swiper";
import { Pagination } from "swiper/modules";

(() => {

    const swiper = new Swiper(".tariffs__swiper.swiper", {
        modules: [Pagination],
        slidesPerView: 3.2,
        centeredSlides: true,
        loop: true,
        spaceBetween: 40,
        initialSlide: 1,
        pagination: {
            el: ".tariffs__pagination",
            clickable: true,
        },
    });

})();
