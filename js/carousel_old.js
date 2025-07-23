//Carousel Logic for Cards Rotation
const track = document.querySelector('.carousel-track');
const leftBtn = document.querySelector('.carousel-btn.left');
const rightBtn = document.querySelector('.carousel-btn.right');
const cards = document.querySelectorAll('.travel-card');

let cardWidth = cards[0].offsetWidth + 32; // Initial estimate
let visibleCards = Math.floor(document.querySelector('.carousel-container').offsetWidth / cardWidth);
let currentIndex = 0;

function updateCardWidth() {
  cardWidth = cards[0].offsetWidth + 32;
  visibleCards = Math.floor(document.querySelector('.carousel-container').offsetWidth / cardWidth);
}

function updateCarousel() {
  const containerWidth = document.querySelector('.carousel-container').offsetWidth;

  if (visibleCards === 1) {
    // Center the card in the container
    const offset = -currentIndex * cardWidth + (containerWidth - cardWidth) / 2;
    track.style.transform = `translateX(${offset}px)`;
  } else {
    const offset = -currentIndex * cardWidth;
    track.style.transform = `translateX(${offset}px)`;
  }
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

// Swipe support for mobile with tap detection
let startX = 0;
let startTime = 0;

track.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  startTime = new Date().getTime();
});

track.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  const endTime = new Date().getTime();
  const diff = startX - endX;
  const duration = endTime - startTime;

  updateCardWidth();

  // Only swipe if move is > 30px and held longer than 100ms
  if (Math.abs(diff) > 30 && duration > 100) {
    if (diff > 0) {
      currentIndex = Math.min(currentIndex + 1, cards.length - visibleCards);
    } else {
      currentIndex = Math.max(currentIndex - 1, 0);
    }
    updateCarousel();
  }

  startX = 0;
  startTime = 0;
});