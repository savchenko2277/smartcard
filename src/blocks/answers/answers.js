(() => {

    const answersSection = document.querySelector('.answers');
    if(!answersSection) return;

    const answersItems = answersSection.querySelectorAll('.answers__item');
    answersItems.forEach(answer => {
        const head = answer.querySelector('.answers__item-title');
        
        head.addEventListener('click', () => {
            answer.classList.toggle('active');
        });
    });

})();
