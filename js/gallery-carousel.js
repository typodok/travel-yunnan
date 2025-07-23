(() => {
  const track = document.querySelector('.gallery-track');
  const leftBtn = document.querySelector('.gallery-btn-left');
  const rightBtn = document.querySelector('.gallery-btn-right');
  const cards = document.querySelectorAll('.gallery-card');

  if (!track || cards.length === 0) return;

  let cardWidth = 0;
  let visibleCards = 0;
  let currentIndex = 0;

function updateCardWidth() {
  const gap = parseInt(window.getComputedStyle(track).gap) || 0;
  cardWidth = cards[0].offsetWidth + gap;
  visibleCards = Math.max(1, Math.floor(document.querySelector('.carousel-container').offsetWidth / cardWidth));
}

  function clampIndex() {
    currentIndex = Math.max(0, Math.min(currentIndex, cards.length - visibleCards));
  }

function updateCarousel() {
  clampIndex();
  const container = document.querySelector('.carousel-container');
  const containerWidth = container.offsetWidth;

  // Adjust center offset: more generous on mobile, less on desktop
  let percent;
  if (visibleCards <= 1) {
    percent = 0.13; // mobile
  } else {
    percent = 0.05; // desktop
  }

  const offset = -currentIndex * cardWidth + containerWidth * percent;

  track.style.transition = 'transform 0.3s ease';
  track.style.transform = `translateX(${offset}px)`;
}

  leftBtn?.addEventListener('click', () => {
    currentIndex--;
    updateCarousel();
  });

  rightBtn?.addEventListener('click', () => {
    currentIndex++;
    updateCarousel();
  });

  window.addEventListener('resize', () => {
    updateCardWidth();
    updateCarousel();
  });

  // Swipe behavior
  let startX = 0;
  let currentTranslate = 0;
  let dragging = false;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    dragging = true;
    track.style.transition = 'none'; // Disable transition for real-time drag
  });

  track.addEventListener('touchmove', (e) => {
    if (!dragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    track.style.transform = `translateX(${ -currentIndex * cardWidth + diff + (track.parentElement.offsetWidth - cardWidth) / 2 }px)`;
  });

  track.addEventListener('touchend', (e) => {
    dragging = false;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    updateCardWidth();

    // Fast swipe
    if (Math.abs(diff) > 30) {
      if (diff > 0) {
        currentIndex = Math.min(currentIndex + 1, cards.length - 1);
      } else {
        currentIndex = Math.max(currentIndex - 1, 0);
      }
    } else {
      // Snap to nearest
      const container = document.querySelector('.carousel-container');
      const containerCenter = container.offsetWidth / 2;
      const trackOffset = track.getBoundingClientRect().left - container.getBoundingClientRect().left;

      let minDistance = Infinity;
      let closestIndex = 0;

      cards.forEach((card, i) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2 + trackOffset;
        const distance = Math.abs(cardCenter - containerCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
        }
      });

      currentIndex = closestIndex;
    }

    updateCarousel();
  });

  // Init
  updateCardWidth();
  updateCarousel();
})();
