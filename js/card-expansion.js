// card_expansion.js
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll('.travel-card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const alreadyExpanded = card.classList.contains('expanded');

      // Collapse all other cards
      document.querySelectorAll('.travel-card.expanded').forEach(c => {
        c.classList.remove('expanded');
      });

      // Expand the clicked card (if it wasn’t already open)
      if (!alreadyExpanded) {
        card.classList.add('expanded');

        // Smooth scroll to make sure expanded card is fully visible
        card.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
