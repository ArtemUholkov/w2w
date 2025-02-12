document.addEventListener('DOMContentLoaded', () => {
    const imagesDesktop = document.querySelectorAll('.slider-section__image');
    const imagesMobile = document.querySelectorAll('.slider-section__image-mob');
    let currentIndex = 0;
    const intervalTime = 3000;

    const updateSlider = () => {
        const isMobileView = window.innerWidth <= 500;

        imagesDesktop.forEach((img) => {
            img.style.display = isMobileView ? 'none' : 'none';
        });
        imagesMobile.forEach((img) => {
            img.style.display = 'none';
        });

        const images = isMobileView ? imagesMobile : imagesDesktop;

        if (images[currentIndex]) {
            images[currentIndex].style.display = 'block';
        }

        currentIndex = (currentIndex + 1) % images.length;
    };

    updateSlider();

    setInterval(updateSlider, intervalTime);

    window.addEventListener('resize', () => {
        currentIndex = 0;
        updateSlider();
    });
});