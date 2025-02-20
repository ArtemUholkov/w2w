document.addEventListener('DOMContentLoaded', () => {
    //Scroll button
    document.querySelectorAll('.scroll-btn').forEach(button => {
        const scrollContainer = button.closest('.section-scroll')?.querySelector('.section-scroll__container');

        if (scrollContainer) {
            button.addEventListener('click', () => {
                const scrollStep = 343;
                const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;

                if (Math.ceil(scrollContainer.scrollLeft) >= maxScrollLeft) {
                    scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    scrollContainer.scrollBy({ left: scrollStep, behavior: 'smooth' });
                }
            });
        }
    });

    //FAQ section
    const faqItems = document.querySelectorAll('.faq-section__item-container');

    if (faqItems) {
        faqItems.forEach((item) => {
            const question = item.querySelector('.faq-section__item-visible');

            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                faqItems.forEach((otherItem) => {
                    otherItem.classList.remove('active');
                });

                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

});