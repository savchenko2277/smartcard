import Swiper from "swiper";
import { Pagination } from "swiper/modules";
import { throttle } from "../../js/libs/utils.js";

(() => {
    const accordeonsSection = document.querySelector(".accordeons");
    if (!accordeonsSection) return;

    let swiper = null;

    const items = accordeonsSection.querySelectorAll(".accordeons__item");
    const images = accordeonsSection.querySelectorAll(".accordeons__image img");

    if (!items.length || !images.length) return;

    const setActiveImage = (index) => {
        images.forEach((img, i) => {
            img.classList.toggle("active", i === index);
            img.classList.remove("is-animated");
        });

        const currentImage = images[index];
        if (!currentImage) return;

        currentImage.classList.add("is-animated");

        setTimeout(() => {
            currentImage.classList.remove("is-animated");
        }, 500);
    };

    const setActiveItem = (index) => {
        items.forEach((item, i) => {
            item.classList.toggle("active", i === index);
        });

        setActiveImage(index);
    };

    const setAccordeons = () => {
        items.forEach((item, index) => {
            const head = item.querySelector(".accordeons__item-head");
            if (!head) return;

            head.addEventListener("click", () => {
                if (window.matchMedia("(max-width: 780px)").matches) return;
                setActiveItem(index);
            });
        });
    };

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

    const activeItem = accordeonsSection.querySelector(".accordeons__item.active");
    const activeIndex = activeItem ? [...items].indexOf(activeItem) : 0;
    setActiveImage(activeIndex);

    window.addEventListener("resize", throttle(setSwiper, 200));
})();