//Main section scroll effect
document.addEventListener("scroll", () => {
    const mainSection = document.querySelector(".main-section");
    const container = document.querySelector(".main-section__container");
    const image = document.querySelector(".main-section__image");
    const imageSmall = document.querySelector(".main-section__image-mob");
    const imageLeft = document.querySelector(".main-section__bg-left-mob");
    const imageRight = document.querySelector(".main-section__bg-right-mob");

    const scrollY = window.scrollY;
    const sectionHeight = mainSection.offsetHeight;

    const progress = Math.min(scrollY / sectionHeight, 1);
    const isSmallScreen = window.innerWidth < 450;

    const scale = isSmallScreen ? 1 + progress * 2.5 : 1 + progress * 1;
    const translateX = isSmallScreen ? 0 : progress * -30;

    if (isSmallScreen) {
        image.style.transform = `scale(1)`;
        image.style.opacity = `0`;
        imageSmall.style.transform = `scale(${scale})`;
        imageSmall.style.opacity = `1`;
    } else {
        image.style.transform = `scale(${scale}) translateX(${translateX}%)`;
        image.style.opacity = `1`;
        imageSmall.style.transform = `scale(1)`;
        imageSmall.style.opacity = `0`;
    }

    if (!isSmallScreen) {
        container.style.transform = `translateY(-${progress * 350}%)`;
        container.style.opacity = `${1 - progress * 1.5}`;
    } else {
        container.style.transform = `translateY(0)`;
        container.style.opacity = `1`;
    }

    const translateXLeft = progress * -150; 
    const translateXRight = progress * 150; 
    const opacity = 1 - progress; 

    imageLeft.style.transform = `translateX(${translateXLeft}%)`;
    imageLeft.style.opacity = `${opacity}`;

    imageRight.style.transform = `translateX(${translateXRight}%)`;
    imageRight.style.opacity = `${opacity}`;
});


// Service section scroll button
document.addEventListener('DOMContentLoaded', () => {
    const scrollButton = document.querySelector('.service-section__scroll');
    const scrollContainer = document.querySelector('.service-section__container-content');

    if (scrollButton && scrollContainer) {
        scrollButton.addEventListener('click', () => {
            scrollContainer.scrollBy({
                left: 340,
                behavior: 'smooth',
            });
        });
    }
});
