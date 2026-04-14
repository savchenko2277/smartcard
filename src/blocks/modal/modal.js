(() => {
    const modals = document.querySelectorAll('.modal');
    const openButtons = document.querySelectorAll('[data-modal]');

    if (!modals.length) return;

    const closeAllModals = () => {
        modals.forEach((modal) => {
            modal.classList.remove('active');
        });

        document.body.classList.remove('no-scroll');
    };

    const openModal = (modalClass) => {
        const currentModal = document.querySelector(`.${modalClass}`);
        if (!currentModal || !currentModal.classList.contains('modal')) return;

        closeAllModals();
        currentModal.classList.add('active');
        document.body.classList.add('no-scroll');
    };

    openButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            const modalClass = button.dataset.modal;
            openModal(modalClass);
        });
    });

    modals.forEach((modal) => {
        const closeButton = modal.querySelector('.modal__close');
        const secondCloseButton = modal.querySelector('[data-close]');
        const content = modal.querySelector('.modal__content');

        if (closeButton) {
            closeButton.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        }

        if (secondCloseButton) {
            secondCloseButton.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });
})();