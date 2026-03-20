import Swiper from "swiper";
import { throttle } from "../../js/libs/utils.js";

(() => {

    const programSection = document.querySelector(".program");
    if (!programSection) return;

    let swiper;

    const setSwiper = () => {
        const isMobile = window.matchMedia("(max-width: 1100px)").matches;    

        if (isMobile && !swiper) {
            swiper = new Swiper(".program__swiper.swiper", {
                slidesPerView: 1.1,
                centeredSlides: true,
                spaceBetween: 12,
                initialSlide: 0,
                breakpoints: {
                    780: {
                        slidesPerView: 2,
                        initialSlide: 1
                    }
                }
            });
        } else {
            if (!isMobile && swiper) {
                swiper.destroy(true, true);
                swiper = null;
            }
        }
    };

    setSwiper();

    window.addEventListener("resize", throttle(setSwiper, 200));

})();
