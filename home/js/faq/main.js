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