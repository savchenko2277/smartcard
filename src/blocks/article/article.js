import Swiper from "swiper";
import { Navigation } from "swiper/modules";

(() => {

    const sectionArticle = document.querySelector('.article');
    if(!sectionArticle) return;

    const swiper = new Swiper(".article__swiper", {
        modules: [Navigation],
        slidesPerView: 2.4,
        spaceBetween: 20,
        initialSlide: 0,
        loop: true,
        navigation: {
            nextEl: document.querySelector('.article .custom-navigation__btn_next'),
            prevEl: document.querySelector('.article .custom-navigation__btn_prev'),
        },
        breakpoints: {
            0: {
                slidesPerView: 1.05,
                spaceBetween: 12
            },
            780: {
                slidesPerView: 2,
                spaceBetween: 16
            },
            1100: {
                slidesPerView: 2.4,
                spaceBetween: 20
            }
        }
    });

    const setArticleNavigationOpen = () => {
        const block = document.querySelector('.article__navigation');
        const button = document.querySelector('.article__navigation-open');

        button.addEventListener('click', () => {
            block.classList.toggle('active');
        });
    }

    setArticleNavigationOpen();

})();
