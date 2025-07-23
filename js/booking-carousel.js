window.addEventListener("load", function () {
  const slides = document.querySelectorAll('.carousel-slide');
  let current = 0;

  if (slides.length === 0) return; // no slides, abort

  slides[current].classList.add('active'); // activate first slide

  function showNextSlide() {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }

  setInterval(showNextSlide, 4000); // every 4 seconds
});
