(() => {

    const promoCardsSection = document.querySelector('.promo-cards__item');
    if (!promoCardsSection) return;

    const btn = document.querySelector('.promo-cards__btn');
    const btnMobile = document.querySelector('.promo-cards__btn-mobile');

    if (!btn || !btnMobile) return;

    let lastScrollY = window.scrollY;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

            const currentScrollY = window.scrollY;
            const isScrollingDown = currentScrollY > lastScrollY;

            if(window.matchMedia("(min-width: 960px)").matches) return;

            if (entry.isIntersecting) {
                // кнопка в зоне — всегда скрываем мобилку
                btnMobile.classList.add('is-hidden');
            } else {
                // кнопка вне зоны
                if (!isScrollingDown) {
                    // только если скроллим вверх — показываем
                    btnMobile.classList.remove('is-hidden');
                }
            }

            lastScrollY = currentScrollY;
        });
    }, {
        threshold: 0.1
    });

    observer.observe(btn);

})();
