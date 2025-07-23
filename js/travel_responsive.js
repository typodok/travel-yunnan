// ===  Responsive title handling ===
(() => {
  function updateHeadlinesForMobile() {
    const isMobile = window.innerWidth <= 600;
    const cards = document.querySelectorAll('.travel-card');

    cards.forEach(card => {
      const h1 = card.querySelector('h1');
      const shortTitle = card.getAttribute('data-title-short');
      const fullTitle = h1.getAttribute('data-full-title') || h1.textContent;

      // Save the full title only once
      if (!h1.getAttribute('data-full-title')) {
        h1.setAttribute('data-full-title', fullTitle);
      }

      // Swap based on screen size
      if (isMobile && shortTitle) {
        h1.textContent = shortTitle;
      } else {
        h1.textContent = fullTitle;
      }
    });
  }

  window.addEventListener('DOMContentLoaded', updateHeadlinesForMobile);
  window.addEventListener('resize', updateHeadlinesForMobile);
})();

// ===  Card expansion behavior ===
(() => {
  const cards = document.querySelectorAll('.travel-card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      console.log('Clicked:', card.querySelector('h1')?.textContent);

      const alreadyExpanded = card.classList.contains('expanded');

      // Collapse all cards and remove existing .card-details
      document.querySelectorAll('.travel-card.expanded').forEach(el => {
        el.classList.remove('expanded');
        const existingDetails = el.querySelector('.card-details');
        if (existingDetails) existingDetails.remove();
      });

      if (!alreadyExpanded) {
        card.classList.add('expanded');

        const duration = card.getAttribute('data-duration') || 'N/A';
        const difficulty = card.getAttribute('data-difficulty') || 'N/A';
        const itinerary = card.getAttribute('data-itinerary') || 'N/A';
        const link = card.getAttribute('data-link') || '#';

        const details = document.createElement('div');
        details.className = 'card-details';
        details.innerHTML = `
          <p><strong>Duration:</strong> ${duration}</p>
          <p><strong>Difficulty:</strong> ${difficulty}</p>
          <p><strong>Itinerary:</strong> ${itinerary}</p>
          <a class="details-link" href="${link}">See full details</a>
        `;
        card.appendChild(details);

        // Scroll into view smoothly
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();