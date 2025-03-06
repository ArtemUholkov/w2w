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
