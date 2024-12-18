const modal = document.getElementById('videoModal');
const openModalBtns = document.querySelectorAll('.open-modal'); // Select all buttons
const closeModalBtn = document.querySelector('.modal .close');

// Add click event to all open modal buttons
openModalBtns.forEach((btn) => {
  btn.addEventListener('click', function () {
    modal.classList.add('show'); // Add 'show' class to trigger animation
  });
});

// Add click event to close button
closeModalBtn.addEventListener('click', function () {
  modal.classList.remove('show'); // Remove 'show' class to hide the modal
});

// Hide modal on outside click
window.addEventListener('click', function (event) {
  if (event.target === modal) {
    modal.classList.remove('show'); // Hide modal
  }
});
