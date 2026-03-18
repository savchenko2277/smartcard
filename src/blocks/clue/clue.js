(() => {

    const clue = document.querySelectorAll('.clue');
    if(!clue) return;

    clue.forEach(clue => {
        const btn = clue.querySelector('.clue__button');
        window.addEventListener('click', (e) => {
            if(btn.contains(e.target)) {
                if(clue.classList.contains('active')) {
                    clue.classList.remove('active');
                } else {
                    clue.classList.add('active');
                }
            } else {
                clue.classList.remove('active');
            }
        });
    });

})();
