document.addEventListener('DOMContentLoaded', () => {
    const el = document.querySelector('.partners-list');
    if (!el) return;

    let swiper = null;

    function init() {
        if (!swiper) {
            swiper = new Swiper(el, {
                spaceBetween: 40,
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
