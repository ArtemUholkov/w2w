document.addEventListener('DOMContentLoaded', () => {
    const scrollButton = document.querySelector('.health-series__btn-scroll');
    const scrollContainer = document.querySelector('.health-cards-list');

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
                    left: 346,
                    behavior: 'smooth',
                });
            }
        });
    }
});