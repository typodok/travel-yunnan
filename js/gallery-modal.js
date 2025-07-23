document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('image-modal');
  const modalImg = document.querySelector('.modal-image');
  const closeBtn = document.querySelector('.close-button');
  const nextBtn = document.querySelector('.modal-next');
  const prevBtn = document.querySelector('.modal-prev');
  const images = Array.from(document.querySelectorAll('.gallery-card img'));

  let currentIndex = 0;

  function fadeToImage(index) {
    if (index < 0 || index >= images.length) return;
    currentIndex = index;

    // Start fade out
    modalImg.classList.add('fade-out');

    // After fade out ends, change image and fade in
    modalImg.addEventListener('transitionend', function handleFade() {
      modalImg.removeEventListener('transitionend', handleFade);
      modalImg.src = images[index].src;
      modalImg.alt = images[index].alt || 'Expanded view';

      // Start fade in
      modalImg.classList.remove('fade-out');
      modalImg.classList.add('fade-in');

      // Remove fade-in after transition to allow repeated use
      setTimeout(() => modalImg.classList.remove('fade-in'), 150);
    });
  }

  function showModal(index) {
    currentIndex = index;
    modalImg.src = images[index].src;
    modalImg.alt = images[index].alt || 'Expanded view';
    modal.classList.remove('hidden');
  }

  images.forEach((img, index) => {
    img.addEventListener('click', () => showModal(index));
  });

  nextBtn.addEventListener('click', () => {
    fadeToImage((currentIndex + 1) % images.length);
  });

  prevBtn.addEventListener('click', () => {
    fadeToImage((currentIndex - 1 + images.length) % images.length);
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    modalImg.src = '';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      modalImg.src = '';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('hidden')) return;
    if (e.key === 'Escape') {
      modal.classList.add('hidden');
      modalImg.src = '';
    } else if (e.key === 'ArrowRight') {
      fadeToImage((currentIndex + 1) % images.length);
    } else if (e.key === 'ArrowLeft') {
      fadeToImage((currentIndex - 1 + images.length) % images.length);
    }
  });

  // 👉 Swipe support
  let startX = 0;
  let startTime = 0;

  modalImg.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startTime = Date.now();
  });

  modalImg.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    const duration = Date.now() - startTime;

    if (Math.abs(diff) > 30 && duration < 500) {
      if (diff > 0) {
        fadeToImage((currentIndex - 1 + images.length) % images.length);
      } else {
        fadeToImage((currentIndex + 1) % images.length);
      }
    }
  });
});
