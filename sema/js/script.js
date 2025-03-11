window.addEventListener('scroll', function () {
  let stMain = document.querySelector('.st_main');

  if (window.innerWidth >= 1060) {
    // Check screen width
    if (window.scrollY > 50) {
      console.log('scrol');
      stMain.classList.add('scrolled');
    } else {
      stMain.classList.remove('scrolled');
    }
  } else {
    stMain.classList.remove('scrolled'); // Ensure class is removed when resizing below 1060px
  }
});
//FAQ section
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
document.addEventListener('DOMContentLoaded', function () {
  if (window.innerWidth <= 980) {
    // Mobile-only effect
    const imgContainers = document.querySelectorAll('.img_container');
    let index = 0;

    function cycleImages() {
      // Remove hover effect from all images
      imgContainers.forEach((container) => container.classList.remove('hover-active'));

      // Apply hover effect to the current container
      imgContainers[index].classList.add('hover-active');

      // Move to the next image, looping back to the first
      index = (index + 1) % imgContainers.length;
    }

    // Start the cycle every 1.5 seconds
    setInterval(cycleImages, 3000);
  }
});
document.addEventListener('DOMContentLoaded', function () {
  const items = document.querySelectorAll('.st_before_after_item');

  function initObserver() {
    if (window.innerWidth > 980) {
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3, // Trigger when at least 30% of the element is visible
      };

      const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('show');
            }, index * 250); // Stagger effect
            observer.unobserve(entry.target); // Stop observing after animation
          }
        });
      }, observerOptions);

      items.forEach((item) => revealOnScroll.observe(item));
    } else {
      // Reset styles on smaller screens
      items.forEach((item) => {
        item.classList.add('show'); // Ensure items are visible on smaller screens
      });
    }
  }

  // Run the function on page load
  initObserver();

  // Re-run when the window resizes
  window.addEventListener('resize', function () {
    items.forEach((item) => item.classList.remove('show')); // Reset animation
    initObserver();
  });
});
document.addEventListener('DOMContentLoaded', function () {
  const steps = document.querySelectorAll('.st_hiw_step');

  function initObserver() {
    if (window.innerWidth > 980) {
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3, // Trigger when at least 30% of the element is visible
      };

      const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('show');
            }, index * 250); // Staggered animation effect
            observer.unobserve(entry.target); // Stop observing after animation
          }
        });
      }, observerOptions);

      steps.forEach((step) => revealOnScroll.observe(step));
    } else {
      // Show all steps instantly on smaller screens
      steps.forEach((step) => {
        step.classList.add('show');
      });
    }
  }

  // Run on page load
  initObserver();

  // Re-run when window resizes
  window.addEventListener('resize', function () {
    steps.forEach((step) => step.classList.remove('show')); // Reset animation
    initObserver();
  });
});
