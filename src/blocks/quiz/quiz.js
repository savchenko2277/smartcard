(() => {
    class Quiz {
        constructor(selector) {
            this.quiz = document.querySelector(selector);
            if (!this.quiz) return;

            this.pagination = this.quiz.querySelector('.quiz__pagination');
            this.slides = [...this.quiz.querySelectorAll('.quiz__slide')];
            this.paginationItems = [];
            this.activeIndex = 0;

            this.init();
        }

        init() {
            this.createPagination();
            this.bindPagination();
            this.bindInputs();
            this.bindButtons();
            this.setActiveSlide(0);
        }

        createPagination() {
            if (!this.pagination || !this.slides.length) return;

            this.pagination.innerHTML = '';

            this.slides.forEach((_, index) => {
                const span = document.createElement('span');
                span.dataset.index = index;
                this.pagination.append(span);
            });

            this.paginationItems = [...this.pagination.querySelectorAll('span')];
        }

        bindPagination() {
            this.paginationItems.forEach((item, index) => {
                item.addEventListener('click', () => {
                    this.setActiveSlide(index);
                });
            });
        }

        bindInputs() {
            this.slides.forEach((slide) => {
                const inputs = slide.querySelectorAll('input[type="checkbox"], input[type="radio"]');

                inputs.forEach((input) => {
                    input.addEventListener('change', () => {
                        this.updateButtonState(slide);
                    });
                });
            });
        }

        bindButtons() {
            this.slides.forEach((slide, index) => {
                const button = slide.querySelector('.quiz__btn');
                if (!button) return;

                button.addEventListener('click', () => {
                    if (button.disabled) return;

                    const nextIndex = index + 1;

                    if (nextIndex < this.slides.length) {
                        this.setActiveSlide(nextIndex);
                    }
                });
            });
        }

        setActiveSlide(index) {
            this.activeIndex = index;

            this.paginationItems.forEach((item, i) => {
                item.classList.toggle('active', i === index);
            });

            this.slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });

            const activeSlide = this.slides[index];
            if (activeSlide) {
                this.updateButtonState(activeSlide);
            }
        }

        updateButtonState(slide) {
            const button = slide.querySelector('.quiz__btn');
            if (!button) return;

            const hasCheckedInput = slide.querySelector('input:checked');
            button.disabled = !hasCheckedInput;
        }
    }

    new Quiz('.quiz');
})();