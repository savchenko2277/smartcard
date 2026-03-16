(() => {

    const header = document.querySelector('.header');
    if(!header) return;

    const burger = header.querySelector('.header__burger');
    const menu = header.querySelector('.header__menu');

    burger.addEventListener('click', () => {
        header.classList.toggle('is-active');
        
        if(header.classList.contains('is-active')) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    });

})();
