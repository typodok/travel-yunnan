// carousel.js
(() => {
  const track = document.querySelector('.carousel-track');
  const leftBtn = document.querySelector('.carousel-btn.left');
  const rightBtn = document.querySelector('.carousel-btn.right');
  const cards = document.querySelectorAll('.travel-card');

  let cardWidth = cards[0].offsetWidth + 32;
  let visibleCards = Math.floor(document.querySelector('.carousel-container').offsetWidth / cardWidth);
  let currentIndex = 0;

  function updateCardWidth() {
    cardWidth = cards[0].offsetWidth + 32;
    visibleCards = Math.floor(document.querySelector('.carousel-container').offsetWidth / cardWidth);
  }

  function updateCarousel() {
    const containerWidth = document.querySelector('.carousel-container').offsetWidth;
    let offset = -currentIndex * cardWidth;
    if (visibleCards <= 1) {
      offset += (containerWidth - cardWidth) / 2;
    }
    track.style.transform = `translateX(${offset}px)`;
  }

  leftBtn.addEventListener('click', () => {
    currentIndex = Math.max(currentIndex - 1, 0);
    updateCarousel();
  });

  rightBtn.addEventListener('click', () => {
    currentIndex = Math.min(currentIndex + 1, cards.length - visibleCards);
    updateCarousel();
  });

  window.addEventListener('resize', () => {
    updateCardWidth();
    updateCarousel();
  });

  // Swipe
  let startX = 0;
  let startTime = 0;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startTime = Date.now();
  });

  track.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const endTime = Date.now();
    const diff = startX - endX;
    const duration = endTime - startTime;

    updateCardWidth();

    if (Math.abs(diff) > 30 && duration > 100) {
      currentIndex = diff > 0
        ? Math.min(currentIndex + 1, cards.length - visibleCards)
        : Math.max(currentIndex - 1, 0);
      updateCarousel();
    }

    startX = 0;
    startTime = 0;
  });
})();