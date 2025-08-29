    // Travel slideshow
  const travelBg = document.querySelector('.travel-bg');
  const travelImages = [
    'images/landing/landing_01.webp',
    'images/landing/landing_02.webp',
    'images/landing/landing_03.webp',
    'images/landing/landing_04.webp',
    'images/landing/landing_05.webp',
    'images/landing/landing_06.webp',
    'images/landing/landing_07.webp',
  ];
  let travelIndex = 0;

  function changeTravelBackground() {
    travelBg.style.backgroundImage = `url(${travelImages[travelIndex]})`;
    travelIndex = (travelIndex + 1) % travelImages.length;
  }

  changeTravelBackground();
  setInterval(changeTravelBackground, 5000);

  /* Game slideshow
  const gameBg = document.querySelector('.game-bg');
  const gameImages = [
    'images/dev_01.webp',
    'images/dev_02.webp',
    'images/dev_03.webp',
    'images/dev_04.webp',
    'images/dev_05.webp'
  ];
  let gameIndex = 0;

  function changeGameBackground() {
    gameBg.style.backgroundImage = `url(${gameImages[gameIndex]})`;
    gameIndex = (gameIndex + 1) % gameImages.length;
  }

  changeGameBackground();
  setInterval(changeGameBackground, 5000);

  // Creative Studio slideshow
const creativeBg = document.querySelector('.creative-bg');
const creativeImages = [
  'images/art_01.webp',
  'images/art_02.webp',
  'images/art_03.webp',
  'images/art_04.webp',
  'images/art_05.webp',
  'images/art_06.webp',
  'images/art_07.webp'
];
let creativeIndex = 0;

function changeCreativeBackground() {
  creativeBg.style.backgroundImage = `url(${creativeImages[creativeIndex]})`;
  creativeIndex = (creativeIndex + 1) % creativeImages.length;
}

changeCreativeBackground();
setInterval(changeCreativeBackground, 5000);*/

  // ========== Tap to Toggle for Mobile ==========

const transitionOverlay = document.querySelector('.page-transition-overlay');
const pages = {
  travel: { color: '#2a9d8f', url: 'travel.html' },
  game: { color: '#264653', url: 'game.html' },
  creative: { color: '#e76f51', url: 'creative.html' }
};

// Detect mobile
const isMobile = window.innerWidth < 768;

// Apply to each section
Object.keys(pages).forEach((key) => {
  const block = document.querySelector(`.${key} .${key}-click-area`);

  block.addEventListener('click', (e) => {
    if (isMobile) {
      // Mobile: tap to activate, then navigate
      if (!block.classList.contains('active')) {
        e.preventDefault();

        // Deactivate all other blocks
        document.querySelectorAll('.block').forEach((el) => {
          el.classList.remove('active');
        });

        // Activate current block
        block.classList.add('active');
      } else {
        e.preventDefault();
        transitionOverlay.style.background = pages[key].color;
        transitionOverlay.classList.add('active');
        setTimeout(() => {
          window.location.href = pages[key].url;
        }, 700);
      }
    } else {
      // Desktop: navigate immediately with transition
      e.preventDefault();
      transitionOverlay.style.background = pages[key].color;
      transitionOverlay.classList.add('active');
      setTimeout(() => {
        window.location.href = pages[key].url;
      }, 700);
    }
  });
});