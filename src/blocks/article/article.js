import Swiper from "swiper";
import { Navigation } from "swiper/modules";

(() => {

    const sectionArticle = document.querySelector('.article');
    if(!sectionArticle) return;

    // --- Инициализация Swiper ---
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
            0: { slidesPerView: 1.05, spaceBetween: 12 },
            780: { slidesPerView: 2, spaceBetween: 16 },
            1100: { slidesPerView: 2.4, spaceBetween: 20 }
        }
    });

    // --- Открытие/закрытие содержания (только по кнопке) ---
    const setArticleNavigationOpen = () => {
        const block = document.querySelector('.article__navigation');
        const button = document.querySelector('.article__navigation-open');
        if (!button || !block) return;

        button.addEventListener('click', () => {
            block.classList.toggle('active');
        });
    }

    // --- СТАБИЛЬНЫЙ SCROLL SPY БЕЗ ЗАКРЫТИЯ МЕНЮ ---
    const initArticleScrollSpy = () => {
        const navItems = document.querySelectorAll('.article__navigation-item');
        const contentGroups = document.querySelectorAll('.article__group');

        if (!navItems.length || !contentGroups.length) return;

        let isProgrammaticScroll = false; 
        let scrollTimeout;

        // Следим за окончанием скролла, чтобы вернуть управление обсерверу
        window.addEventListener('scroll', () => {
            if (!isProgrammaticScroll) return;
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isProgrammaticScroll = false;
            }, 100); 
        }, { passive: true });

        navItems.forEach((item, index) => {
            const link = item.querySelector('.article__navigation-link');
            const target = contentGroups[index];

            if (!link || !target) return;

            link.addEventListener('click', (e) => {
                e.preventDefault();

                isProgrammaticScroll = true;

                // Сразу подсвечиваем нужный пункт в меню
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');

                // Рассчитываем точные координаты с учетом липкой шапки
                const isMobile = window.innerWidth <= 780;
                const headerOffset = isMobile ? 90 : 120; // Высота вашей фиксированной шапки
                
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                // Запускаем чистый нативный скролл
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            });
        });

        // --- Настройка Intersection Observer ---
        const isMobile = window.innerWidth <= 780;
        
        const observerOptions = {
            root: null,
            // Сужаем зону на мобилках до центра, чтобы не было ложных срабатываний
            rootMargin: isMobile ? '-35% 0px -45% 0px' : '-15% 0px -60% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            if (isProgrammaticScroll) return; // Если летим по клику — обсервер игнорирует скролл

            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = Array.from(contentGroups).indexOf(entry.target);
                    
                    if (index !== -1 && navItems[index]) {
                        navItems.forEach(nav => nav.classList.remove('active'));
                        navItems[index].classList.add('active');
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        contentGroups.forEach(group => observer.observe(group));
    };

    setArticleNavigationOpen();
    initArticleScrollSpy();

})();