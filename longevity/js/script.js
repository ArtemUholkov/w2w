//Main section scroll effect
document.addEventListener('scroll', () => {
  const mainSection = document.querySelector('.main-section');
  const container = document.querySelector('.main-section__container');
  const image = document.querySelector('.main-section__image');
  const imageSmall = document.querySelector('.main-section__image-mob');
  const imageLeft = document.querySelector('.main-section__bg-left-mob');
  const imageRight = document.querySelector('.main-section__bg-right-mob');

  const scrollY = window.scrollY;
  const sectionHeight = mainSection.offsetHeight;

  const progress = Math.min(scrollY / sectionHeight, 1);
  const isSmallScreen = window.innerWidth < 450;

  const scale = isSmallScreen ? 1 + progress * 0.5 : 1 + progress * 1;
  const translateX = isSmallScreen ? 0 : progress * -30;

  if (isSmallScreen) {
    image.style.transform = `scale(1)`;
    // image.style.opacity = `0`;
    imageSmall.style.transform = `scale(${scale})`;
    // imageSmall.style.opacity = `1`;
  } else {
    image.style.transform = `scale(${scale}) translateX(${translateX}%)`;
    // image.style.opacity = `1`;
    imageSmall.style.transform = `scale(1)`;
    // imageSmall.style.opacity = `0`;
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
  const opacity = 1;

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
      const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      const currentScrollLeft = scrollContainer.scrollLeft;
      if (Math.ceil(currentScrollLeft) >= maxScrollLeft - 1) {
        scrollContainer.scrollTo({
          left: 0,
          behavior: 'smooth',
        });
      } else {
        scrollContainer.scrollBy({
          left: 340,
          behavior: 'smooth',
        });
      }
    });
  }
});

// Review section scroll button
document.addEventListener('DOMContentLoaded', () => {
  const scrollButton = document.querySelector('.review-section__scroll');
  const scrollContainer = document.querySelector('.review-section__content-container');

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
          left: 340,
          behavior: 'smooth',
        });
      }
    });
  }
});

//FAQ section
document.addEventListener('DOMContentLoaded', () => {
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
});

//Slider section
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
