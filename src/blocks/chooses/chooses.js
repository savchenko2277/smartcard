import Swiper from "swiper";
import { Pagination } from "swiper/modules";
import { throttle } from "../../js/libs/utils.js";

(() => {

    const choosesSection = document.querySelector(".chooses");
    if(!choosesSection) return;

    let swiper;

    const setSwiper = () => {
        const isMobile = window.matchMedia("(max-width: 1100px)").matches;

        if (isMobile && !swiper) {
            swiper = new Swiper(".chooses__cards.swiper", {
                modules: [Pagination],
                slidesPerView: 1.2,
                centeredSlides: true,
                spaceBetween: 8,
                initialSlide: 1,
                pagination: {
                    el: ".custom-pagination",
                    clickable: true,
                },
                breakpoints: {
                    780: {
                        slidesPerView: 1.7,
                        initialSlide: 1
                    }
                }
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
