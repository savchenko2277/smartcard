(() => {

    const header = document.querySelector('.header');
    if (!header) return;

    const burger = header.querySelector('.header__burger');
    const menu = header.querySelector('.header__menu');

    burger.addEventListener('click', () => {
        header.classList.toggle('is-active');

        if (header.classList.contains('is-active')) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    });

    const setHeaderLists = () => {
        const header = document.querySelector('.header');
        const headerLists = document.querySelectorAll('.header__item_list');
        const desktopWidth = 1100;

        if (window.innerWidth >= desktopWidth) {

            headerLists.forEach((item) => {
                const link = item.querySelector('.header__item-link');
                const container = item.querySelector('.header__item-content-container');

                item.addEventListener('mouseenter', () => {
                    headerLists.forEach((list) => list.classList.remove('active'));
                    item.classList.add('active');

                    if (link && container) {
                        const linkRect = link.getBoundingClientRect();
                        const headerRect = header.getBoundingClientRect();
                        const containerWidth = container.offsetWidth;
                        const screenWidth = window.innerWidth;

                        // Идеальный центр меню относительно ссылки
                        let leftPos = (linkRect.left + linkRect.width / 2) - (containerWidth / 2) - headerRect.left;

                        // --- Расчет сетки основного контейнера (1720px) ---
                        const siteContainerWidth = 1680;
                        const basePadding = 40; // Базовый безопасный отступ от краев экрана, когда экран меньше 1720px

                        // Вычисляем, где сейчас начинается левый край контентного контейнера 1720px на экране
                        const minLeft = Math.max(basePadding, (screenWidth - siteContainerWidth) / 2);

                        // Правая граница, дальше которой меню идти не должно
                        const maxLeft = screenWidth - containerWidth - minLeft;

                        // Зажимаем меню в рамки контентного контейнера 1720px
                        if (leftPos < minLeft) leftPos = minLeft;
                        if (leftPos > maxLeft) leftPos = maxLeft;

                        container.style.left = `${leftPos}px`;
                    }
                });

                // Закрытие по повторному клику на ссылку (десктоп)
                if (link) {
                    link.addEventListener('click', (e) => {
                        if (item.classList.contains('active')) {
                            e.preventDefault(); // Отменяем переход/прыжок по '#'
                            item.classList.remove('active');
                        }
                    });
                }
            });

            // Закрытие, когда мышка полностью улетает из хедера
            document.addEventListener('mousemove', (e) => {
                const insideHeader = e.target.closest('.header');

                if (!insideHeader) {
                    headerLists.forEach((item) => item.classList.remove('active'));
                }
            });

        } else {
            // Код для мобилок оставляем как был
            headerLists.forEach((item) => {
                const head = item.querySelector('.header__item-link');
                const content = item.querySelector('.header__item-content');

                head.addEventListener('click', (e) => {
                    e.preventDefault();

                    headerLists.forEach((list) => {
                        if (list !== item) list.classList.remove('active');
                    });

                    item.classList.toggle('active');
                });

                document.addEventListener('click', (e) => {
                    if (!content.contains(e.target) && !head.contains(e.target)) {
                        item.classList.remove('active');
                    }
                });
            });
        }
    };

    setHeaderLists();

})();
