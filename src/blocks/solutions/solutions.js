import Swiper from "swiper";
import { Pagination } from "swiper/modules";
import { throttle } from "../../js/libs/utils.js";

(() => {

    let swiper;

    const setSwiper = () => {
        if (window.matchMedia("(max-width: 780px)").matches) {
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
        } else {
            if (swiper) {
                swiper.destroy();
            }
        }
    }


    window.addEventListener("resize", () => {
        window.addEventListener("resize", throttle(() => {
            setSwiper();
        }, 200));
    });

    setSwiper();

})();
