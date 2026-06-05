(() => {

    const header = document.querySelector('.header');
    if (!header) return;

    const burger = header.querySelector('.header__burger');
    const headerLists = document.querySelectorAll('.header__item_list');

    // Клик на бургер (мобилка)
    burger.addEventListener('click', () => {
        header.classList.toggle('is-active');

        if (header.classList.contains('is-active')) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    });

    // Функция проверки режима: десктоп или мобилка
    // Проверяем видимость бургера — это на 100% синхронизирует JS с вашим CSS медиазапросом при любом зуме
    const checkIsDesktop = () => {
        return window.getComputedStyle(burger).display === 'none';
    };

    const setHeaderLists = () => {
        if (!headerLists.length) return;

        headerLists.forEach((item) => {
            const link = item.querySelector('.header__item-link');
            const container = item.querySelector('.header__item-content-container');
            const content = item.querySelector('.header__item-content');

            // --- ДЕСКТОП: ПОЗИЦИОНИРОВАНИЕ И ХОВЕР ---
            item.addEventListener('mouseenter', () => {
                if (!checkIsDesktop()) return;

                headerLists.forEach((list) => list.classList.remove('active'));
                item.classList.add('active');

                if (link && container) {
                    // 1. Получаем текущий зум страницы
                    const zoom = parseFloat(window.getComputedStyle(document.documentElement).zoom) || 1;

                    // 2. Координаты элементов в системе координат окна (актуальный размер на экране)
                    const linkRect = link.getBoundingClientRect();
                    const containerRect = container.getBoundingClientRect();
                    const offsetParentRect = (container.offsetParent || header).getBoundingClientRect();

                    // Чистая ширина видимого экрана (без скроллбара)
                    const viewportWidth = document.documentElement.clientWidth;

                    // Идеальная позиция: центр выпадашки строго по центру ссылки
                    let targetLeft = (linkRect.left + linkRect.width / 2) - (containerRect.width / 2);

                    // 3. Рассчитываем жесткие границы контента (1680px из макета переводим под зум)
                    const maxSiteWidth = 1680 * zoom;
                    const padding = 40 * zoom; // Боковые безопасные отступы

                    // Левая граница, дальше которой меню не должно уходить влево
                    let minLeft = padding;
                    if (viewportWidth > maxSiteWidth) {
                        minLeft = (viewportWidth - maxSiteWidth) / 2;
                    }

                    // Правая граница: край экрана/контента минус ширина самого меню
                    let maxLeft = viewportWidth - containerRect.width - minLeft;

                    // Если при жестком зуме меню физически шире, чем область контента
                    if (maxLeft < minLeft) {
                        minLeft = padding;
                        maxLeft = viewportWidth - containerRect.width - padding;
                    }

                    // 4. ЖЕСТКИЙ КЛАМП (Прижимание к краям)
                    if (targetLeft < minLeft) {
                        targetLeft = minLeft; // Не даем уйти влево — прижимаем по левой границе
                    } else if (targetLeft > maxLeft) {
                        targetLeft = maxLeft; // НЕ ДАЕМ УЙТИ ВПРАВО — намертво прижимаем по правой границе
                    }

                    // 5. Переводим финальную позицию окна в CSS-пиксели родителя с учетом зума
                    const finalLeftCSS = (targetLeft - offsetParentRect.left) / zoom;

                    container.style.left = `${finalLeftCSS}px`;
                }
            });

            item.addEventListener('mouseleave', () => {
                if (!checkIsDesktop()) return;
                item.classList.remove('active');
            });

            // --- КЛИКИ (МОБИЛКА / ДЕСКТОП) ---
            if (link) {
                link.addEventListener('click', (e) => {
                    if (checkIsDesktop()) {
                        if (item.classList.contains('active')) {
                            
                            item.classList.remove('active');
                        }
                    } else {
                        
                        headerLists.forEach((list) => {
                            if (list !== item) list.classList.remove('active');
                        });
                        item.classList.toggle('active');
                    }
                });
            }

            document.addEventListener('click', (e) => {
                if (checkIsDesktop()) return;
                if (content && link) {
                    if (!content.contains(e.target) && !link.contains(e.target)) {
                        item.classList.remove('active');
                    }
                }
            });
        });
    };
    setHeaderLists();

    // Сбрасываем активные классы при изменении размеров/зума окна, чтобы верстка не залипала
    window.addEventListener('resize', () => {
        headerLists.forEach((item) => item.classList.remove('active'));
    });

})();