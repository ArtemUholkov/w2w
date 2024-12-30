const zoomImage = document.querySelector('.st_main_cover');
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const zoomFactor = 1 + scrollPosition / 1000; // Adjust zoom sensitivity
  zoomImage.style.transform = `scale(${zoomFactor})`;
});
