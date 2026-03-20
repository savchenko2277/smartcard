(() => {
    const modals = document.querySelectorAll('.modal');
    const openButtons = document.querySelectorAll('[data-modal]');

    if (!modals.length) return;

    const closeAllModals = () => {
        modals.forEach((modal) => {
            modal.classList.remove('active');
        });
    };

    const openModal = (modalClass) => {
        const currentModal = document.querySelector(`.${modalClass}`);
        if (!currentModal || !currentModal.classList.contains('modal')) return;

        closeAllModals();
        currentModal.classList.add('active');
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
        const content = modal.querySelector('.modal__content');

        if (closeButton) {
            closeButton.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }

        modal.addEventListener('click', (e) => {
            if (!content.contains(e.target)) {
                modal.classList.remove('active');
            }
        });
    });
})();