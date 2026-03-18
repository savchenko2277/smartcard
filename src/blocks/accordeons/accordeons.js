import Swiper from "swiper";
import { Pagination } from "swiper/modules";
import { throttle } from "../../js/libs/utils.js";

(() => {

    const accordeonsSection = document.querySelector(".accordeons");
    if (!accordeonsSection) return;

    let swiper;
    const image = accordeonsSection.querySelector(".accordeons__image img");

    const preloadImages = () => {
        const imgs = accordeonsSection.querySelectorAll(".accordeons__item-image");

        imgs.forEach(img => {
            const src = img.getAttribute("src");
            const preImg = new Image();
            preImg.src = src;
        });
    };

    preloadImages();

    const setSrcImage = (value) => {
        image.setAttribute("src", value);
        image.classList.add("is-animated");

        setTimeout(() => {
            image.classList.remove("is-animated");
        }, 500);
    }

    const setAccordeons = () => {
        const items = accordeonsSection.querySelectorAll(".accordeons__item");

        items.forEach((item) => {
            const head = item.querySelector(".accordeons__item-head");
            const src = item.querySelector(".accordeons__item-image").getAttribute("src");

            head.addEventListener("click", () => {
                if (window.matchMedia("(max-width: 780px)").matches) return;

                items.forEach((item) => {
                    item.classList.remove("active");
                });

                item.classList.add("active");
                setSrcImage(src);
            });
        });
    }

    const setSwiper = () => {
        const isMobile = window.matchMedia("(max-width: 780px)").matches;

        if (isMobile && !swiper) {
            swiper = new Swiper(".accordeons__items.swiper", {
                modules: [Pagination],
                slidesPerView: 1.1,
                centeredSlides: true,
                spaceBetween: 8,
                initialSlide: 1,
                pagination: {
                    el: ".custom-pagination",
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
    setAccordeons();

    window.addEventListener("resize", throttle(setSwiper, 200));

})();
