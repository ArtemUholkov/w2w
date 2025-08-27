document.addEventListener('DOMContentLoaded', function () {
    const target = document.getElementById('heroSection');
    let hasScrolledOnce = false;

    function onScroll() {
        if (window.innerWidth < 1280) {
            target.classList.remove('active');
            return;
        }

        const rect = target.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        if (!hasScrolledOnce && window.scrollY > 10) {
            hasScrolledOnce = true;
        }

        if (hasScrolledOnce && rect.top < windowHeight && rect.bottom > 0) {
            target.classList.add('active');
        }

        if (rect.top >= 0 && rect.top < 10) {
            target.classList.remove('active');
            hasScrolledOnce = false;
        }
    }

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onScroll); // на случай изменения ширины
    onScroll();

});
