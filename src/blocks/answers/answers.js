(() => {

    const answersSection = document.querySelector('.answers');
    if (!answersSection) return;

    const answersItems = answersSection.querySelectorAll('.answers__item');
    answersItems.forEach(answer => {
        const head = answer.querySelector('.answers__item-title');

        head.addEventListener('click', () => {

            if(answer.classList.contains('active')) {
                answer.classList.remove('active');
                return;
            };

            answersItems.forEach(answer => {
                answer.classList.remove('active');
            });

            answer.classList.add('active');
        });
    });

})();
