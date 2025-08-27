document.addEventListener('DOMContentLoaded', () => {
    const el = document.querySelector('.meet-alien_logo-line');
    if (!el) return;

    let swiper = null;

    function init() {
        if (!swiper) {
            swiper = new Swiper(el, {
                spaceBetween: 72,
                slidesPerView: 'auto',
                loop: true,
                speed: 5000,
                autoplay: { delay: 0, disableOnInteraction: false },
                on: {
                    init(sw) {
                        sw.el.querySelector('.swiper-wrapper').style.transitionTimingFunction = 'linear';
                    }
                }
            });
        }
    }

    init();
});