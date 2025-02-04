document.addEventListener('DOMContentLoaded', () => {
    //Scroll button
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

    //Start animation when element in viewport
    if (window.innerWidth > 1279) {
        window.addEventListener('scroll', function () {
            let sectionsList = document.querySelectorAll('.animate');
            let scrollPosition = window.scrollY;

            sectionsList.forEach(function (el) {
                let topOffset = el.getBoundingClientRect().top + window.scrollY - 100;
                let bottomPosition = topOffset + el.offsetHeight;

                if (scrollPosition > topOffset && scrollPosition < bottomPosition) {
                    el.classList.add('active');
                }
            });
        });
    };

});