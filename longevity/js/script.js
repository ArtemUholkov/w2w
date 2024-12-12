//Main section scroll effect
document.addEventListener("scroll", () => {
    const mainSection = document.querySelector(".main-section");
    const container = document.querySelector(".main-section__container");
    const image = document.querySelector(".main-section__image");

    const scrollY = window.scrollY;
    const sectionHeight = mainSection.offsetHeight;

    const progress = Math.min(scrollY / sectionHeight, 1);

    container.style.transform = `translateY(-${progress * 350}%)`;
    container.style.opacity = `${1 - progress * 1.5}`;

    image.style.transform = `scale(${1 + progress * 1})`;
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
