import { driveTabs } from "../../js/libs/driveTabs";
import Swiper from "swiper";
import { Pagination } from "swiper/modules";
import { throttle } from "../../js/libs/utils.js";

(() => {

    const tabs = driveTabs({
        container: '.tariffs-cards__tabs',
        controls: '.tariffs-cards__nav-btn',
        selects: '.tariffs-cards__tab',
        cls: 'active'
    });

    const setSwipers = () => {
        const elements = document.querySelectorAll('.tariffs-cards__tab.swiper');

        if (!elements.length) return;

        const isMobile = window.matchMedia("(max-width: 1099px)").matches;

        elements.forEach(el => {

            if (isMobile) {
                if (!el.swiper) {
                    el.swiperInstance = new Swiper(el, {
                        modules: [Pagination],
                        slidesPerView: 1.05,
                        spaceBetween: 16,
                        centeredSlides: true,
                        initialSlide: 0,
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
            }

            else {
                if (el.swiper) {
                    el.swiper.destroy(true, true);
                }
            }
        });
    };

    setSwipers();

    window.addEventListener('resize', throttle(setSwipers, 200));

})();
