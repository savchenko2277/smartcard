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
        const headerLists = document.querySelectorAll('.header__item_list');

        headerLists.forEach((item) => {
            const head = item.querySelector('.header__item-link');
            const content = item.querySelector('.header__item-content');

            head.addEventListener('click', (e) => {
                e.preventDefault();

                headerLists.forEach((list) => {
                    if (list !== item) {
                        list.classList.remove('active');
                    }
                });

                item.classList.toggle('active');
            });

            document.addEventListener('click', (e) => {
                const isClickInsideContent = content.contains(e.target);
                const isClickOnHead = head.contains(e.target);

                if (!isClickInsideContent && !isClickOnHead) {
                    item.classList.remove('active');
                }
            });
        });
    };

    setHeaderLists();

})();
