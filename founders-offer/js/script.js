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

    //Active class change
    const sections = document.querySelectorAll('.animated-items');

    sections.forEach(function(section) {
        const items = section.querySelectorAll('.item');
        let currentIndex = 0;

        setInterval(function() {
            items[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % items.length;
            items[currentIndex].classList.add('active');
        }, 4000);
    });

});