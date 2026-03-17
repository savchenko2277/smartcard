import Swiper from "swiper";
import { Pagination } from "swiper/modules";
import { throttle } from "../../js/libs/utils.js";

(() => {

    let swiper;

    const setSwiper = () => {
        const isMobile = window.matchMedia("(max-width: 780px)").matches;

        if (isMobile && !swiper) {
            swiper = new Swiper(".solutions__cards.swiper", {
                modules: [Pagination],
                slidesPerView: 1.2,
                centeredSlides: true,
                spaceBetween: 8,
                initialSlide: 1,
                pagination: {
                    el: ".solutions__pagination",
                    clickable: true,
                },
            });
        }

        if (!isMobile && swiper) {
            swiper.destroy(true, true);
            swiper = null;
        }
    };

    setSwiper();

    window.addEventListener("resize", throttle(setSwiper, 200));

})();
