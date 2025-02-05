document.addEventListener('DOMContentLoaded', () => {
    //Scroll button
    const scrollButton = document.querySelector('.review-section__scroll');
    const scrollContainer = document.querySelector('.review-section__content-container');

    if (scrollButton && scrollContainer) {
        scrollButton.addEventListener('click', () => {
            const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            if (Math.ceil(scrollContainer.scrollLeft) >= maxScrollLeft) {
                scrollContainer.scrollTo({
                    left: 0,
                    behavior: 'smooth',
                });
            } else {
                scrollContainer.scrollBy({
                    left: 340,
                    behavior: 'smooth',
                });
            }
        });
    }

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